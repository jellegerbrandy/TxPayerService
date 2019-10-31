import { expect } from "chai";
import request from "supertest";

import app from "../../src/app";
import {
  getRandomAccount,
  deployContract,
  newContract,
  getDefaultAccount
} from "../../src/api/web3";
import { EXAMPLE_ABI, BYTE_CODE } from "../constants.data";

const paymentTest = async () => {
  try {
    const from = await getRandomAccount();
    const contract = newContract(
      EXAMPLE_ABI,
      "0xbcbFF059589c2c6A4530cb816EB398BC4096e923",
      from,
      3000000
    );
    const contractAddress = await deployContract(contract, from, BYTE_CODE, [
      10
    ]);

    process.env.WHITELISTED_ADDRESSES = `${contractAddress} 0x5Aa8609B948A8697B7b826c33BC51E6209E0Ac67`;
    process.env.WHITELISTED_METHODS =
      "vote(uint8) redeem(address,uint256,uint256)";

    const parameters = {
      to: contractAddress,
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
      .post(`/send-tx`)
      .send(parameters);

    // const balance = await contract.methods.winningProposal().call();

    expect(response.body.status).to.eq(200);
    // expect(balance).to.eq(5)
  } catch (error) {
    console.log(error);
  }
};

const payerEndpoint = it("Integration payer test", paymentTest);

describe("Integration send payment", () => payerEndpoint);
