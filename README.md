[![Build Status](https://travis-ci.com/dOrgTech/TxPayerService.svg?branch=develop)](https://travis-ci.com/dOrgTech/TxPayerService)

# Tx Payer Service

### Installing

`npm install`

### Running locally

`npm run dev`

### Config Environment

`Set your own .env, checkout .env-example for reference :)`

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
				"internalType": "uint8",
				"name": "toProposal",
				"type": "uint8"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	"parameters": 5
}
```

##### GET - Retrieve provider address

`/address`

#### GET - Retrieve provider address balance

`/balance`

## Folder Structure & Tools

TODO
