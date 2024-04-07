import axios from 'axios';
import queryString from 'query-string';

const axiosApp = axios.create({
  paramsSerializer: params => queryString.stringify(params),
  baseURL: 'http://192.168.1.13:3000',
});

axiosApp.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };
  config.data;
  return config;
});
axiosApp.interceptors.response.use(
  res => {
    if (res.data && res.data.status === 200) {
      return res.data;
    }
    throw new Error('Error');
  },
  error => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw new Error(error.response);
  },
);

export default axiosApp;
