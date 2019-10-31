import { web3, provider } from "./core";

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
