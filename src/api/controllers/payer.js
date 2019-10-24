import { sendSignedTx, etherToWei, getTransactionNumber, getDefaultAccount, signTransaction } from '../web3'

export const payer = async (request, response) => {
  // this has to be changed to retrieve the private key from mneomonic 
  const PRIVATE_KEY = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'
  try {
    const { recipient, amount } = request.params
    const defaultAccount = await getDefaultAccount()
    const AMOUNT_TO_SEND = etherToWei(amount);
    const nonce = await getTransactionNumber(defaultAccount);    
    const transactionObject = {
        to: recipient,
        value: AMOUNT_TO_SEND,
        gas: 21000,
        nonce
    }
    const signedTransaction = await signTransaction(transactionObject, PRIVATE_KEY);
    console.log('Sending ether...');
    const transactionHash = hash => {
      console.log(`Transaction done. Hash of transaction: ${hash}`);
      response.send({ status: 200, message: 'Transaction done', hash, transactionObject });
    }
    const onError = error => {
      console.log(`An error has occured: ${error}`);
      response.send({ status: 503, message: 'An error has occured', error });
    }
    try {
      const txHash = await sendSignedTx(signedTransaction.rawTransaction)
      transactionHash(txHash)        
    } catch (txError) {
      onError(txError)
    }
  } catch (error) {
    console.log(`An error has occured: ${error}`);
    response.send({ status: 503, message: `An error has occured: ${error}` })
  }
}

