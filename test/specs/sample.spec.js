/* globals describe, it */
import axios from 'axios';
import { expect } from 'chai';

const endpointAPI = axios.create({
  baseURL: process.env.BASE_API,
});

const payloadCreateUsers = {
  name: 'morpheus',
  job: 'leader',
};

const payloadUpdateUsers = {
  name: 'morpheus',
  job: 'zion resident',
};

const endpoint = {
  endpointListUsers: '/users?page=2',
  endpointCreateUsers: '/users',
  endpointSpesificUsers: '/users/2',
};

describe('WebdriverIO - API Demo', () => {
  it('GET - List Users', async () => {
    const response = await endpointAPI.get(endpoint.endpointListUsers);

    expect(response.status).to.equal(200);
  });

  it('POST - Create Users', async () => {
    const response = await endpointAPI.post(endpoint.endpointCreateUsers, payloadCreateUsers);

    expect(response.status).to.equal(201);
    expect(response.data).to.have.all.keys('name', 'job', 'id', 'createdAt');
  });

  it('PUT - Update Users', async () => {
    const response = await endpointAPI.put(endpoint.endpointSpesificUsers, payloadUpdateUsers);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.all.keys('name', 'job', 'updatedAt');
  });

  it('PATCH - Update Users', async () => {
    const response = await endpointAPI.patch(endpoint.endpointSpesificUsers, payloadUpdateUsers);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.all.keys('name', 'job', 'updatedAt');
  });

  it('DELETE - Delete Users', async () => {
    const response = await endpointAPI.delete(endpoint.endpointSpesificUsers);

    expect(response.status).to.equal(204);
    expect(response.data).to.have.length(0);
  });
});
