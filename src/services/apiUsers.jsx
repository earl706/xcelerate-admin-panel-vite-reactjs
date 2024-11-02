import axios from "axios";

const productionAPIURL = import.meta.env.VITE_PRODUCTION_API_URL;
const developmentAPIURL = import.meta.env.VITE_DEVELOPMENT_API_URL;
const inProduction = import.meta.env.VITE_IN_PRODUCTION;

const APIURL = inProduction == "true" ? productionAPIURL : developmentAPIURL;

const APIusers = axios.create({
  baseURL: `${APIURL}api/users/`,
});

APIusers.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default APIusers;
