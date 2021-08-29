const axios = require('axios');
const userRequest = axios.create({
  baseURL: 'http://localhost:3000/users/',
  timeout: 1000,
});
const taskRequest = axios.create({
  baseURL: 'http://localhost:3000/tasks',
  timeout: 1000,
});
module.exports = { userRequest, taskRequest };
