import { expect } from "chai";
import request from "supertest";
import sinon from "sinon";

import app from "../../src/app";
import * as web3 from "../../src/api/web3/methods";

let sandbox;
beforeEach(function() {
  sandbox = sinon.createSandbox();
});

afterEach(function() {
  sandbox.restore();
});

const getPayerTest = async () => {
  const web3mock = sandbox.mock(web3);
  process.env.WHITELISTED_ADDRESSES =
    "0xbcbFF059589c2c6A4530cb816EB398BC4096e923 0x5Aa8609B948A8697B7b826c33BC51E6209E0Ac67";
  process.env.WHITELISTED_METHODS =
    "vote(uint8) redeem(address,uint256,uint256)";
  const address = "0x47017142E5A406EA651c53616d30c5aa55Fe7B76";
  web3mock.expects("getDefaultAccount").returns(address);
  web3mock.expects("getTransactionNumber").returns(10);
  web3mock.expects("newContract").returns("");
  web3mock.expects("sendContractMethod").returns("");

  const parameters = {
    to: "0xbcbFF059589c2c6A4530cb816EB398BC4096e923",
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
};

const payerEndpoint = it("Unit payer test", getPayerTest);

describe("Unit send payment", () => payerEndpoint);
