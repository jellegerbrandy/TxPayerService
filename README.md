[![Build Status](https://travis-ci.com/dOrgTech/TxPayerService.svg?branch=develop)](https://travis-ci.com/dOrgTech/TxPayerService)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dOrgTech/TxPayerService)

# Tx Payer Service

### Installing

`npm install`

### Running locally

`npm run dev`

### Config Environment

`Set your own .env, checkout .env-example for reference :)`

WHITELISTED_METHODS: The ABI(s) of the contract

WHITELISTED_ADDRESSES: The addresses of the contracts you want to interact with

Note: The whitelisted methods has to be separated with spaces (arguments are separated by commas, not with spaces) - Check the env.example to see the right format

## Project Architecture

### Endpoints

#### POST - Create tx

`/send-tx`
Parameters to send:

```
{
  to: Recipient Address,
  methodAbi: Method ABI,
  parameters: Parameters of contract method
}
```

This is an example of how you should send the parameters:

```
{
	"to": "0xbcbFF059589c2c6A4530cb816EB398BC4096e923",
	"methodAbi": {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_lockingId",
        "type": "uint256"
      }
    ],
    "name": "redeem",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "reputation",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
	"parameters": [0x6ebe4210302C28804fF1136706E5166D0F8852f2, 10]
}
```

##### GET - Retrieve provider address

`/address`

#### GET - Retrieve provider address balance

`/balance`

## Folder Structure & Tools

TODO
