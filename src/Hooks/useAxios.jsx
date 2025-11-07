import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dragon-ball-server.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
