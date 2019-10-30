import { web3 } from "./core";
import { fromWei, toWei, toHex } from "./utils";

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

export const sendTx = txObject => {
  return new Promise((resolve, reject) => {
    web3.eth
      .sendTransaction(txObject)
      .on("transactionHash", txHash => resolve(txHash))
      .on("error", error => reject(error));
  });
};

export const etherToWei = amount => {
  return toWei(amount, "ether");
};

export const getTransactionNumber = async account => {
  return await web3.eth.getTransactionCount(account);
};

export const newContract = (abi, address, from, gas) => {
  return new web3.eth.Contract(abi, address, { from, gas });
};

export const deployContract = (contract, from, byteCode, parameters) => {
  return new Promise((resolve, reject) => {
    contract
      .deploy({ data: byteCode, arguments: parameters })
      .send({
        from,
        gas: 1500000,
        gasPrice: "30000000000000"
      })
      .on("error", error => reject(error))
      .then(newContractInstance => {
        console.log(newContractInstance.options);
        resolve(newContractInstance.options.address);
      });
  });
};

export const sendContractMethod = (
  contactInstance,
  method,
  txObject,
  parameters
) => {
  const { from, nonce } = txObject;
  return new Promise((resolve, reject) => {
    contactInstance.methods[method](parameters)
      .send({ from, nonce })
      .on("confirmation", (_, receipt) => {
        resolve(receipt);
      })
      .on("error", error => {
        reject(error);
      });
  });
};

export const getByteCode = async address => {
  return await web3.eth.getCode(address);
};
