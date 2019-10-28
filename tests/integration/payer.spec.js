import { expect } from "chai";
import request from "supertest";

import app from "../../src/app";
import { getRandomAccount } from "../../src/api/web3";

const paymentTest = async () => {
  const address = await getRandomAccount();
  const response = await request(app)
    .post(`/pay`)
    .send({ recipient: address, amount: 10 });
  expect(response.body.status).to.eq(200);
};

const payerEndpoint = it("Integration payer test", paymentTest);

describe("Integration send payment", () => payerEndpoint);
