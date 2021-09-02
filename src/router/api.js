const axios = require('axios');
const API_URL = process.env.API_URL;
const userRequest = axios.create({
  baseURL: `${API_URL}/users/`,
  timeout: 1000,
});
const taskRequest = axios.create({
  baseURL: `${API_URL}/tasks`,
  timeout: 1000,
});
module.exports = { userRequest, taskRequest };
