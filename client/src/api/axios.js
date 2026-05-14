import axios from "axios";

const API = axios.create({
  baseURL: "https://auth-service-provider.onrender.com",
  withCredentials: true,
});

export default API;