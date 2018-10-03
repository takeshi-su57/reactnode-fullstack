import axios from 'axios';

axios.interceptors.request.use(
  config => {
    const token = ''; // accessToken();

    if (token != null) {
      /* eslint-disable */
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

const get = (url) => axios.get(url);
const post = (url, data) => axios.post(url, data);
const put = (url, data) => axios.put(url, data);
const del = (url) => axios.delete(url);

const dataService = {
  get,
  post,
  put,
  delete: del,
};

export { dataService };
