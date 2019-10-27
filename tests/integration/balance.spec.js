import app from '../../src/app';
import { expect } from 'chai';
import request from 'supertest';

const getBalanceTest = async () => {
  const response = await request(app)
  .get('/balance')
  expect(response.body.status).to.eq(200)
  expect(response.body.balance).to.be.a('string')
}

const balanceEnpoint = it("Integration balance test", getBalanceTest)

describe("Integration check balance", () => balanceEnpoint)