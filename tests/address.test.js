import app from 'app';
import request from 'supertest';

const getAddressTest = async () => {
  const response = await request(app)
  .get('/address')
  expect(response.body.address).stringContaining('0x')
}

const addressEnpoint = test("Address test", getAddressTest)

describe("Check address", () => addressEnpoint)