import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/app';
import { getRandomAccount } from '../../src/api/web3'

const paymentTest = async () => {
  // const address = await getRandomAccount()
  // console.log(address)
  const address = '0x47017142E5A406EA651c53616d30c5aa55Fe7B76'
  const response = await request(app)
  .get(`/pay/${address}/5`)
  expect(response.body.status).to.eq(200)
}

const payerEndpoint = it("Integration payer test", paymentTest)

describe("Integration send payment", () => payerEndpoint)