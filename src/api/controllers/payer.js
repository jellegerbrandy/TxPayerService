import {
  sendTx,
  etherToWei,
  getTransactionNumber,
  getDefaultAccount,
  newContract,
  sendContractMethod,
  toHexadecimal
} from "api/web3";

const transactionHash = (hash, response, txObject) => {
  console.log(`Transaction done. Hash of transaction: ${hash}`);
  response.send({
    status: 200,
    message: "Transaction done",
    hash,
    txObject
  });
};

const onError = (error, response) => {
  console.log(`An error has occured: ${error}`);
  response.send({ status: 503, message: "An error has occured", error });
};

export const payer = async (request, response) => {
  try {
    const {
      contractAddress,
      method,
      parameters,
      recipient,
      amount
    } = request.body;
    const { TARGET_CONTRACTS_ADDRESS, TARGET_CONTRACTS_METHODS } = process.env;
    const defaultAccount = await getDefaultAccount();

    const contractRequested = TARGET_CONTRACTS_ADDRESS.includes(
      contractAddress
    );
    const methodRequested = JSON.parse(TARGET_CONTRACTS_METHODS).filter(
      contractMethod => {
        if (contractMethod.name === method) {
          return contractMethod;
        }
      }
    );

    let transactionObject = {};

    if (contractRequested && methodRequested.length > 0) {
      const encryptedMethod = toHexadecimal(method).toString();
      const data = parameters
        ? encryptedMethod +
          toHexadecimal(parameters)
            .toString()
            .substring(2)
        : encryptedMethod;
      transactionObject = {
        from: defaultAccount,
        to: contractAddress,
        data,
        gas: 50000
      };
    } else {
      const AMOUNT_TO_SEND = etherToWei(amount.toString());
      const nonce = await getTransactionNumber(defaultAccount);
      transactionObject = {
        from: defaultAccount,
        to: recipient,
        value: AMOUNT_TO_SEND,
        gas: 50000,
        nonce
      };
    }
    console.log("Creating tx...");
    try {
      const txHash = await sendTx(transactionObject);
      transactionHash(txHash, response, transactionObject);
    } catch (error) {
      onError(error, response);
    }
  } catch (error) {
    console.log(`An error has occured: ${error}`);
    response.send({ status: 503, message: `An error has occured: ${error}` });
  }
};
