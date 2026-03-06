import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const HEADERS_KEY = process.env.NEXT_PUBLIC_REQRES_HEADERS_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-api-key": HEADERS_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
