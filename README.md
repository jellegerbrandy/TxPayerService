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
  methodInterface: Method ABI
}
```

##### GET - Retrieve provider address

`/address`

#### GET - Retrieve provider address balance

`/balance`

## Folder Structure & Tools

TODO
