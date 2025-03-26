const { expect } = require("@playwright/test");
const { request } = require("axios");
const cookie = require("cookie");
const { parse } = require("path");

let apiUrl

async function authenticateUser(useranme, password, { request }) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    'Content-Type': 'application/json',
  };

  const requestBody = {
    email: useranme,
    password: password,
  };

  const response = await request.post(`${apiUrl}/users/login`, {
    data: requestBody,
    headers,
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  const token = responseBody.token;
  return token;
}

async function getApiBaseUrl() {
  apiUrl = process.env.API_BASE_URL;
  if(!apiUrl) {
    apiUrl = 'https://thinking-tester-contact-list.herokuapp.com';
  }
  return apiUrl;
}

async function getEntity(accessToken, module, status, {request}) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': "Bearer " + accessToken,
  };

  const response = await request.get('apiUrl' + module, {
    headers,
  });

  const statusCode = response.status();
  expect(statusCode).toBe(parseInt(status));
  const responseBody = await response.json();
  if(responseBody && responseBody[0]._id) {
    return responseBody[0]._id;
  } else {
    return null;
  }
}

async function deleteEntity(accessToken, module, status, {request}) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': "Bearer " + accessToken,
  };

  const response = await request.delete('apiUrl' + module, {
    headers,
  });

  const statusCode = response.status();
  expect(statusCode).toBe(200);
}
async function validateEntity(accessToken, module, status, {request}) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': "Bearer " + accessToken,
  };

  const response = await request.get('apiUrl' + module, {
    headers,
  });

  const statusCode = response.status();
  expect(statusCode).toBe{parseInt(status)};
}