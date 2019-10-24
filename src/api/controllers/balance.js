import { defaultAccount,  getBalance, fromWei } from '../web3';

export const balance = async (request, response) => {
  try {
    const senderBalanceInWei = await getBalance(defaultAccount);
    const balanceInEth = fromWei(senderBalanceInWei, 'ether');
    console.log(`Balance available in address: ${balanceInEth} ETH`);
    const message = `Balance available in address: ${balanceInEth} ETH`
    const balance = balanceInEth
    response.send({ status: 200, message, balance })
  } catch (error) {
    console.log(`An error has occured: ${error}`);
    response.send({ status: 503, message: `An error has occured getting balance of address: ${error}` })
  }
}