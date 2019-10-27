import { sendSignedTx, etherToWei, getTransactionNumber, getDefaultAccount, signTransaction } from 'api/web3'

export const payer = async (request, response) => {
  // this has to be changed to retrieve the private key from mneomonic 
  const PRIVATE_KEY = '2c7d7dd1b3988e4383e2724fe4de45c9f33ff9392590304e1dc398823c2d5269'
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

