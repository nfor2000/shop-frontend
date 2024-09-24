import axios from "axios";
import { useCookies } from "react-cookie";

const axiosInstance = axios.create({
     baseURL: "http://localhost:3001/",
     timeout: 50000,
     headers: {
          "Content-Type": "application/json",
     },
});

const AxiosProvider = () => {
     const [cookie, _] = useCookies();
     const accessToken = cookie["accessToken"];
     axiosInstance.interceptors.request.use(
          (config) => {
               if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
               }
               return config;
          },
          (error) => {
               return Promise.reject(error);
          }
     );

     return { axiosInstance };
};

export default AxiosProvider;
