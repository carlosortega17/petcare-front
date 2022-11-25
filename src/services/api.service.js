/* eslint-disable  */
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:1337/api',
  responseType: 'json',
});

API.interceptors.request.use((config) => {
  const storage = JSON.parse(localStorage.getItem('user-storage'));
  if (storage?.state?.jwt) {
    config.headers['Authorization'] = `Bearer ${storage.state.jwt}`;
  }
  return config;
});

export default API;
