import axios from "axios";

const productionAPIURL = import.meta.env.VITE_PRODUCTION_API_URL;
const developmentAPIURL = import.meta.env.VITE_DEVELOPMENT_API_URL;
const inProduction = import.meta.env.VITE_IN_PRODUCTION;

const APIURL = inProduction == "true" ? productionAPIURL : developmentAPIURL;

const APItournaments = axios.create({
  baseURL: `${APIURL}api/tournaments/`,
});

APItournaments.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminExcelerateToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default APItournaments;
