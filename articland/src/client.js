import axios from 'axios';
export const baseHostUrl = 'http://localhost:5000';
export const AxClient = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  //   headers: {
  //      Authorization: localStorage.getItem('basicAuth')
  //  }
});