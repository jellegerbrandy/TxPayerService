import { web3, provider } from "./core";
import { getDefaultAccount } from "./methods";

export const { fromWei } = web3.utils;

export const checkWeb3 = async (_, response, next) => {
  if (provider.engine.currentBlock) {
    next();
  } else {
    response.send({
      status: 400,
      message: "Ensure NETWORK_URL is correct - Provider could not be reached"
    });
  }
};

export const checkBalance = async (_, response, next) => {
  const defaultAcc = await getDefaultAccount();
  const defaultAccountBalance = fromWei(await web3.eth.getBalance(defaultAcc));
  if (defaultAccountBalance > 1) {
    next();
  } else {
    response.send({
      status: 400,
      message: `The service has run out of funds (It has less than 1 ether) - Please refill by doing a deposit to the wallet ${defaultAcc}`
    });
  }
};
