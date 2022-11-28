import baseURL from "@/shared/config/baseURL";
import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true,
});

const axiosPublic = axios.create({
  baseURL,
});

export default axiosPublic;
