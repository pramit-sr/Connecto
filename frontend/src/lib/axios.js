import axios from "axios";
import { API_BASE_URL, LOCAL_API_BASE_URL, IS_DEVELOPMENT, USE_REMOTE_API } from "../constants/config.js";

const baseURL = IS_DEVELOPMENT && !USE_REMOTE_API ? LOCAL_API_BASE_URL : API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
