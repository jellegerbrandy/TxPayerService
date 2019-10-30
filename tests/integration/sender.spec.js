import { expect } from "chai";
import request from "supertest";

import app from "../../src/app";
import {
  getRandomAccount,
  deployContract,
  newContract,
  getByteCode
} from "../../src/api/web3";
import { EXAMPLE_ABI } from "../abi.data";

const paymentTest = async () => {
  try {
    const from = await getRandomAccount();
    const contract = newContract(
      EXAMPLE_ABI,
      "0xbcbFF059589c2c6A4530cb816EB398BC4096e923",
      from,
      3000000
    );
    const byteCode = await getByteCode(contract.options.address);
    const contractAddress = await deployContract(contract, from, byteCode, [
      10
    ]);

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
      parameters: 5
    };

    const response = await request(app)
      .post(`/send-tx`)
      .send(parameters);
    expect(response.body.status).to.eq(200);
  } catch (error) {
    console.log(error);
  }
};

const payerEndpoint = it("Integration payer test", paymentTest);

describe("Integration send payment", () => payerEndpoint);
