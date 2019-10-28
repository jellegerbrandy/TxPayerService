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
  const address = "0x47017142E5A406EA651c53616d30c5aa55Fe7B76";
  web3mock.expects("getDefaultAccount").returns(address);
  web3mock.expects("getTransactionNumber").returns(10);
  web3mock.expects("sendTx").returns("");

  const response = await request(app).get(`/pay/${address}/5`);

  expect(response.body.status).to.eq(200);
};

const payerEndpoint = it("Unit payer test", getPayerTest);

describe("Unit send payment", () => payerEndpoint);
