import axios from 'axios';

export const requestServerSideAPI = (context?: any) => {
  const { accessToken } = context.req.cookies;
  const request = axios.create({
    baseURL: 'http://localhost:3000',
  });

  // request.interceptors.request.use((config) => {
  //   console.log('###########################################');
  //   console.log(accessToken);
  //   console.log(config);
  //   return config;
  // });

  if (accessToken) {
    request.defaults.headers['authorization'] = `Bearer ${accessToken}`;
  }

  return request;
};
