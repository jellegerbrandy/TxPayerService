import web3 from './core'

export const getBalance = async account => {
  const balance = await web3.eth.getBalance(account)
  return balance
}

export const getDefaultAccount = async () => {
  const account = await web3.eth.getAccounts()
  return account[0]
}

export const toEther = amount => {
  return web3.utils.fromWei(amount.toString(), 'ether');
}

export const sendSignedTx = signedTx => {
  return new Promise((resolve, reject) => {
    web3.eth.sendSignedTransaction(signedTx)
    .on('transactionHash', txHash => resolve(txHash) )
    .on('error', error => reject(error) )
  })
}

export const etherToWei = amount => {
  return web3.utils.toWei(amount, 'ether')
}


export const getTransactionNumber = async account => {
  return await web3.eth.getTransactionCount(account)
}

export const signTransaction = async (txObject, privateKey) => {
  try {
    return await web3.eth.accounts.signTransaction(txObject, privateKey)
  } catch (error) {
    console.log(error)
  }
} 