import { defaultAccount } from '../web3';

export const address = async (request, response) => {
  try {
    const address = defaultAccount
    const message = `address: ${address}`
    response.send({ status: 200, message, address })
  } catch (error) {
    console.log(`An error has occured: ${error}`);
    response.send({ status: 503, message: `An error has occured getting balance of address: ${error}` })
  }
}