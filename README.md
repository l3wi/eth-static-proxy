# Ethereum Static Proxy

A simple project that API'ifies Ethereum contracts so they can be integrated into other applications. Its supports vanilla contracts and those implementing [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967).

### How to use:

To use the project you need to craft URLs with the following options:

- url: `proxy.blackwattle.ad/`
- contract: `0x443d2f2755db5942601fa062cc248aaa153313d3`
- call: `totalSupply`
- decimals: `18`

Then these are combined to create:

`proxy.blackwattle.ad/?contract=0x443d2f2755db5942601fa062cc248aaa153313d3&call=totalSupply&decimals=18`

This will return the requested data.

`857933065.109681220090416279`

*Note: if you don't want the data converted by the decimals, just remove the decimals parameter*

#### Built by [Lewi](https://twitter.com/LewisFreiberg)

