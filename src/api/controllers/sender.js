import {
  getTransactionNumber,
  getDefaultAccount,
  newContract,
  sendContractMethod
} from "api/web3";

const transactionHash = (hash, response) => {
  console.log(`Transaction done. Hash of transaction: ${hash}`);
  response.send({
    status: 200,
    message: "Transaction done",
    hash
  });
};

const onError = (error, response) => {
  console.log(`An error has occured: ${error}`);
  response.send({ status: 503, message: "An error has occured", error });
};

export const sender = async (request, response) => {
  try {
    const { to, methodAbi, parameters } = request.body;
    const { WHITELISTED_ADDRESSES, WHITELISTED_METHODS } = process.env;
    const defaultAccount = await getDefaultAccount();

    const addressRequested = WHITELISTED_ADDRESSES.split(" ");
    const methodRequested = WHITELISTED_METHODS.split(" ");

    const validAddress = addressRequested.includes(to);
    const validMethod = methodRequested.filter(method => {
      return method.includes(methodAbi.name);
    });

    const regExp = /\(([^)]+)\)/;
    const methodInputsTypes = regExp.exec(WHITELISTED_METHODS);

    let correctParameters = true;
    const methodArguments = methodInputsTypes[1].split(",");
    methodArguments.forEach((inputType, index) => {
      if (inputType !== methodAbi.inputs[index].type) {
        correctParameters = false;
      }
    });

    if (validAddress && validMethod.length > 0 && correctParameters) {
      try {
        const nonce = await getTransactionNumber(defaultAccount);
        const txObject = {
          from: defaultAccount,
          nonce
        };
        const contractInstance = newContract(
          [methodAbi],
          defaultAccount,
          3000000
        );

        contractInstance.options.address = to;

        const receipt = await sendContractMethod(
          contractInstance,
          methodAbi.name,
          txObject,
          parameters
        );
        transactionHash(receipt.transactionHash, response);
      } catch (error) {
        onError(error, response);
      }
    } else {
      const message = !validAddress
        ? "Contract address is not valid or added in whitelist"
        : !validMethod
        ? "Method ABI is not valid or added in whitelist"
        : "Parameters of method are not correct";
      response.send({ status: 400, message });
    }
  } catch (error) {
    console.log(`An error has occured: ${error}`);
    response.send({ status: 503, message: `An error has occured: ${error}` });
  }
};
