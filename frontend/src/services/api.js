import axios from 'axios';

const API = axios.create({
  baseURL: 'https://tokenwise-7msi.onrender.com/api',
});

export const fetchTransactions = () => API.get('/transactions');
