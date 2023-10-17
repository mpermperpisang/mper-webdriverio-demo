/* globals describe, it */
import axios from 'axios';
import { expect } from 'chai';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_API,
});

const endpoint = {
  v1NinfaMcDermott: '/v1/Ninfa+McDermott',
  v1UserApprovalRequests: `/v1/${process.env.API_USER}/approvalRequests`,
};

describe('WebdriverIO - API Demo', () => {
  it('[V1] GET - Ninfa McDermott', async () => {
    const response = await axiosInstance.get(endpoint.v1NinfaMcDermott);

    expect(response.status).to.equal(200);
  });

  it('[V1] GET - Approval Request', async () => {
    const response = await axiosInstance.get(endpoint.v1UserApprovalRequests);

    expect(response.status).to.equal(200);
  });
});
