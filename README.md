# Ethereum Static Proxy

A simple project that API'ifies Ethereum contracts so they can be integrated into other applications. Its supports vanilla contracts and those implementing [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967).

### How to use:

To use the project you need to craft URLs with the following options:

- url: `proxy.blackwattle.ad`
- Address: `0x443d2f2755db5942601fa062cc248aaa153313d3`
- call: `totalSupply`
- decimals: `18`

Then these are combined to create:

`proxy.blackwattle.ad/?address=0x443d2f2755db5942601fa062cc248aaa153313d3&call=totalSupply&decimals=18`

This will return the requested data.

`857933065.109681220090416279`

*Note: if you don't want the data converted by the decimals, just remove the decimals parameter*

### How to setup:

In order to setup your own instance of this server, do the following:

```
git clone https://github.com/l3wi/eth-static-proxy.git

cd eth-static-proxy

yarn 
```

Once you've cloned the repo and installed the required dependancies you need to setup the environment variables:

```
touch .env

echo "ETHERSCAN=<YOUR-ETHERSCAN-KEY-HERE>" >> .env

echo "ETHNODE=<YOUR-JSON-RPC-NODE-HERE>" >> .env
```

Then run the server using a process manager like [pm2](https://pm2.keymetrics.io/) or [forever](https://www.npmjs.com/package/forever) or simply by running:

```
yarn start
```



#### Built by [Lewi](https://twitter.com/LewisFreiberg)

