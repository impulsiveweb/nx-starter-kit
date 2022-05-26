import Axios from "axios";
import Cookies from 'js-cookie';

const API = Axios.create({
  baseURL: process.env.WEB_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
});

API.interceptors.request.use(
  function (config: any) {
    const token = Cookies.get('token');
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`;
    }else{
      delete config.headers['Authorization'];
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response: any) {
    return response.data;
  },
  function (error: any) {
    return error;
  }
);

export default API;