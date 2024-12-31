import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://task-management-app-t0wq.onrender.com", // Base URL from your backend
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;