import {
  sendTx,
  etherToWei,
  getTransactionNumber,
  getDefaultAccount
} from "api/web3";

export const payer = async (request, response) => {
  // this has to be changed to retrieve the private key from mneomonic
  try {
    const { recipient, amount } = request.params;
    const defaultAccount = await getDefaultAccount();
    const AMOUNT_TO_SEND = etherToWei(amount);
    const nonce = await getTransactionNumber(defaultAccount);
    const transactionObject = {
      from: defaultAccount,
      to: recipient,
      value: AMOUNT_TO_SEND,
      gas: 50000,
      nonce
    };
    console.log("Sending ether...");
    const transactionHash = hash => {
      console.log(`Transaction done. Hash of transaction: ${hash}`);
      response.send({
        status: 200,
        message: "Transaction done",
        hash,
        transactionObject
      });
    };
    const onError = error => {
      console.log(`An error has occured: ${error}`);
      response.send({ status: 503, message: "An error has occured", error });
    };
    try {
      const txHash = await sendTx(transactionObject);
      transactionHash(txHash);
    } catch (error) {
      onError(error);
    }
  } catch (error) {
    console.log(`An error has occured: ${error}`);
    response.send({ status: 503, message: `An error has occured: ${error}` });
  }
};
