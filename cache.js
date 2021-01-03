var flatCache = require('flat-cache')
var path = require('path')
console.log(__dirname)

var cache = flatCache.load('cacheId', __dirname)

const setABI = (address, abi) => {
  cache.setKey(address, abi)
  cache.save(true)
}

const fetchABI = (address) => {
  const data = cache.getKey(address)
  return data
}

module.exports = {
  fetchABI,
  setABI,
}
