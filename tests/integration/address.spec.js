import app from '../../src/app';
import { expect } from 'chai';
import request from 'supertest';

const getAddressTest = async () => {
  const response = await request(app)
  .get('/address')
  expect(response.body.status).to.eq(200)
  expect(response.body.address).to.match(/(?:0x)/)
}

const addressEnpoint = it("Address test", getAddressTest)

describe("Integration check address", () => addressEnpoint)