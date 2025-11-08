import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "https://smart-deals-server-steel.vercel.app/",
});

const useAxiosSecure = () => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          const token = user.accessToken;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }

          return config;
        }
      );

      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => {
          return res;
        },
        (err) => {
          const status = err.status;
          if (status === 401 || status === 403) {
            console.log("log out the user for bad request");
            signOutUser().then(() => {
              navigate("/auth/login");
            });
          }
        }
      );
      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.request.eject(responseInterceptor);
      };
    }
  }, [user, loading, signOutUser, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
