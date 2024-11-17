// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};
