import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon'

import app from '../../src/app';
import * as web3 from '../../src/api/web3/methods'

let sandbox;
beforeEach(function () {
    sandbox = sinon.createSandbox();
});

afterEach(function () {
    sandbox.restore();
});

const getAddressTest = async () => {
  const web3api = sandbox.mock(web3);
  web3api.expects('getDefaultAccount').returns('0xb45BbC8030D9B06D7CBaFA62DCfa126981Dd9E8e')

  const response = await request(app)
  .get('/address')

  expect(response.body.status).to.eq(200)
  expect(response.body.address).to.eq("0xb45BbC8030D9B06D7CBaFA62DCfa126981Dd9E8e")
}

const addressEnpoint = it("Unit address test", getAddressTest)

describe("Unit check address", () => addressEnpoint)