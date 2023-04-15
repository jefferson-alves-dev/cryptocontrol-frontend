import axios from 'axios';
import { getCookie } from 'cookies-next';

const accessToken = getCookie('accessToken');

export const requestClientSideAPI = axios.create({
  baseURL: 'http://localhost:3000',
});

// requestClientSideAPI.interceptors.request.use((config) => {
//   console.log(config);
//   return config;
// });

if (accessToken) {
  requestClientSideAPI.defaults.headers[
    'authorization'
  ] = `Bearer ${accessToken}`;
}
