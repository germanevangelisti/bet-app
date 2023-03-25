import axios from "axios";
import setAuthToken from "./setAuthToken";

const customAxios = axios.create();

// Attach the interceptor to the customAxios instance
customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthToken(token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default customAxios;
