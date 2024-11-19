// utils/api.ts
import axios from 'axios';

// Define Axios instance
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// Define a type for the API response
export interface User {
  id: number;
  name: string;
  email: string;
}

// Fetch users with TypeScript typings
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/users');
  return data;
};
