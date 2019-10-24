import { defaultAccount, accounts, sendSignedTransaction, getTransactionCount, toWei } from '../web3';

export const payer = async (request, response) => {
  const {
   PROVIDER_PRIVATE_KEY
  } = process.env

  try {
    const { recipient, amount } = request.params
    const AMOUNT_TO_SEND = toWei(amount, 'ether');
    const nonce = await getTransactionCount(defaultAccount);    
    const transactionObject = {
        to: recipient,
        value: AMOUNT_TO_SEND,
        gas: 21000,
        nonce
    }
    const signedTransaction = await accounts.signTransaction(transactionObject, PROVIDER_PRIVATE_KEY);
    console.log('Sending ether...');
    const transactionHash = hash => {
      console.log(`Transaction done. Hash of transaction: ${hash}`);
      response.send({ status: 200, message: 'Transaction done', hash, transactionObject });
    }
    const onError = error => {
      console.log(`An error has occured: ${error}`);
      response.send({ status: 503, message: 'An error has occured', error });
    }
    sendSignedTransaction(signedTransaction.rawTransaction)
    .on('transactionHash', transactionHash)
    .on('error', onError)        
  } catch (error) {
    console.log(`An error has occured: ${error}`);
    response.send({ status: 503, message: `An error has occured: ${error}` })
  }
}

