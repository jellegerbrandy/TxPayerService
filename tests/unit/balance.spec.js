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

const getBalanceTest = async () => {
  const web3mock = sandbox.mock(web3);
  web3mock
    .expects("getDefaultAccount")
    .returns("0xb45BbC8030D9B06D7CBaFA62DCfa126981Dd9E8e");
  web3mock.expects("getBalance").returns("100000000000000000");

  const response = await request(app).get("/.netlify/functions/index/balance");

  expect(response.body.status).to.eq(200);
  expect(response.body.balance).to.be.eq("0.1");
};

const balanceEnpoint = it("Unit balance test", getBalanceTest);

describe("Check balance", () => balanceEnpoint);
