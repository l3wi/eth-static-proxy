// Proxify ETH contracts
// 1.  Take API call for address and function
// 2. Get ABI
// 3.  Run call/s on node
// 4.  Return data

require('dotenv').config()
const { send } = require('micro')
const query = require('micro-query')
const rateLimit = require('micro-ratelimit')
const cors = require('micro-cors')()

const fetch = require('isomorphic-fetch')
const ethers = require('ethers')

const { setABI, fetchABI } = require('./cache')

class StaticJsonRpcProvider extends ethers.providers.JsonRpcProvider {
  // Stupid ass shim
  async detectNetwork() {
    let network = '0x1'
    return network
  }
}
const provider = new StaticJsonRpcProvider(process.env.ETHNODE)

// Query Etherscan for ABI
const getABI = async (address, res) => {
  // Check if address is proxy (Slow but required if implementation changes)
  const proxy = await isProxy(address)
  let contractAddress = proxy ? proxy : address

  // Exit before fetching ABI if we have cached the ABI
  const cachedABI = await fetchABI(contractAddress)
  if (cachedABI) return cachedABI

  // Continue and hit Etherscan for the verified ABI
  const response = await fetch(
    `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.ETHERSCAN}`
  ).then((data) => data.json())
  try {
    const ABI = JSON.parse(response.result)
    await setABI(contractAddress, ABI)
    return ABI
  } catch (error) {
    send(
      res,
      400,
      'Contract is unverfied on Etherscan, please verify to continue'
    )
  }
}

// Check if address is a compliant proxy
const isProxy = async (address) => {
  const data = await provider.getStorageAt(
    address,
    '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc' // bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
  )
  const implementation = ethers.utils.hexStripZeros(data)

  return ethers.utils.isAddress(implementation) ? implementation : null
}

module.exports = cors(
  rateLimit({ headers: true }, async (req, res) => {
    // Get query string
    const { address, call, decimals } = query(req)
    try {
      // Fetch ABI
      const abi = await getABI(address)
      // Setup Contract Instance
      const caller = new ethers.Contract(address, abi, provider)
      // Query requested call
      const data = await caller[call]()

      const response = !decimals
        ? data.toString()
        : ethers.utils.formatUnits(data, decimals)

      // Return response
      send(res, 200, response)
    } catch (error) {
      console.log(error)
      send(res, 500, error)
    }
  })
)
