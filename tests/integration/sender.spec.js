import { expect } from "chai";
import request from "supertest";

import app from "../../src/app";
import {
  getRandomAccount,
  deployContract,
  newContract
} from "../../src/api/web3";
import { EXAMPLE_ABI, BYTE_CODE } from "../constants.data";

describe("Integration send payment", () => {
  let contract;

  before(async () => {
    try {
      const from = await getRandomAccount();
      contract = newContract(EXAMPLE_ABI, from, 4700000);

      const contractAddress = await deployContract(contract, from, BYTE_CODE, [
        10
      ]);
      contract.options.address = contractAddress;
      process.env.WHITELISTED_ADDRESSES = `${contractAddress} 0x5Aa8609B948A8697B7b826c33BC51E6209E0Ac67`;
      process.env.WHITELISTED_METHODS =
        "vote(uint8) redeem(address,uint256,uint256)";
    } catch (error) {
      console.log(error);
    }
  });

  it("Integration payer test", async () => {
    const parameters = {
      to: contract.options.address,
      methodAbi: {
        constant: false,
        inputs: [
          {
            internalType: "uint8",
            name: "toProposal",
            type: "uint8"
          }
        ],
        name: "vote",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      parameters: [5]
    };

    const response = await request(app)
      .post(`/.netlify/functions/index/send-tx`)
      .send(parameters);
    expect(response.body.status).to.eq(200);
  }, 5000);

  it("Check chain test", async () => {
    setTimeout(async () => {
      const winner = await contract.methods.winningProposal().call();
      expect(winner).to.eq("5");
    }, 3000);
  });
});
