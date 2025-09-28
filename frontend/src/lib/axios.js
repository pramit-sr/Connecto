import axios from "axios";
import { API_BASE_URL, LOCAL_API_BASE_URL, IS_DEVELOPMENT } from "../constants/config.js";

export const axiosInstance = axios.create({
  baseURL: IS_DEVELOPMENT ? LOCAL_API_BASE_URL : API_BASE_URL,
  withCredentials: true,
});
