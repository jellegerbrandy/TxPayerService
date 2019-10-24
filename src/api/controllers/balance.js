import { getBalance, getDefaultAccount, toEther } from '../web3'

export const balance = async (_, response) => {
  try {
    const defaultAccount = await getDefaultAccount()
    const senderBalanceInWei = await getBalance(defaultAccount);
    const balance = toEther(senderBalanceInWei);
    const message = `Balance available in address: ${balance} ETH`
    console.log(message);
    response.send({ status: 200, message, balance })
  } catch (error) {
    console.log(`An error has occured: ${error}`);
    response.send({ status: 503, message: `An error has occured getting balance of address: ${error}` })
  }
}