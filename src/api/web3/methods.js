import { web3 } from "./core";
import { fromWei } from "./utils";

export const getBalance = async account => {
  const balance = await web3.eth.getBalance(account);
  return balance;
};

export const getRandomAccount = async () => {
  const index = Math.floor(Math.random() * 5 + 1);
  const account = await web3.eth.getAccounts();
  return account[index];
};

export const getDefaultAccount = async () => {
  const account = await web3.eth.getAccounts();
  return account[0];
};

export const toEther = amount => {
  return fromWei(amount.toString(), "ether");
};

export const getTransactionNumber = async account => {
  return await web3.eth.getTransactionCount(account);
};

export const newContract = (abi, from) => {
  return new web3.eth.Contract(abi, { from });
};

export const deployContract = (contract, from, byteCode, parameters) => {
  return new Promise((resolve, reject) => {
    contract
      .deploy({ data: byteCode, arguments: parameters })
      .send({
        from,
        gas: 3000000
      })
      .on("error", error => reject(error))
      .then(newContractInstance => {
        resolve(newContractInstance.options.address);
      });
  });
};

export const sendContractMethod = (
  contactInstance,
  method,
  txObject,
  ...parameters
) => {
  const { from, nonce, gas } = txObject;
  return new Promise((resolve, reject) => {
    contactInstance.methods[method](...parameters)
      .send({ from, nonce, gas })
      .on("confirmation", (_, receipt) => {
        resolve(receipt);
      })
      .on("error", error => {
        reject(error);
      });
  });
};

export const callContractMethod = (contractInstance, method, ...parameters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gasEstimation = await contractInstance.methods[method](
        ...parameters
      ).estimateGas({ from: await getDefaultAccount() });
      resolve(gasEstimation);
    } catch (error) {
      reject(error);
    }
  });
};

export const checkWeb3Connection = async (_, response, next) => {
  const isConnected = await web3.eth.net.isListening();
  if (isConnected) {
    next();
  } else {
    response.send({
      status: 400,
      message: "Ensure NETWORK_URL is correct - Provider could not be reached"
    });
  }
};

export const checkAccountBalance = async (_, response, next) => {
  const defaultAcc = await getDefaultAccount();
  const defaultAccountBalance = fromWei(await web3.eth.getBalance(defaultAcc));
  if (defaultAccountBalance > 0.001) {
    next();
  } else {
    response.send({
      status: 400,
      message: `The service has run out of funds (It has less than 0.001 ether) - Please refill by doing a deposit to the wallet ${defaultAcc}`
    });
  }
};

export const tryContractMethod = async (request, response, next) => {
  const defaultAccount = await getDefaultAccount();
  const { to, methodAbi, parameters } = request.body;
  const contractInstance = newContract([methodAbi], defaultAccount);
  contractInstance.options.address = to;
  let gas = 0;
  try {
    const gasEstimate = await callContractMethod(
      contractInstance,
      methodAbi.name,
      ...parameters
    );
    gas = gasEstimate ? gasEstimate * 2 : 1000000;
    request.gas = gas;
    request.gasLimit = gas + 1000;
  } catch (error) {
    console.log(error);
    // response.send({
    //   status: 400,
    //   message: `Transaction can not be done`,
    //   error
    // });
  }
  next();
};
