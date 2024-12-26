import axios from "axios";

const createAxiosInterceptor = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true, // Essential for cookies
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Don't set Content-Type for FormData
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }

      console.log("Request Config:", {
        url: config.url,
        method: config.method,
        headers: config.headers,
      });

      return config;
    },
    (error) => {
      console.error("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response Received:", {
        status: response.status,
        data: response.data,
      });
      return response;
    },
    async (error) => {
      console.error("Axios Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const originalRequest = error.config;

      // Handle 401 (Unauthorized) errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh token (cookie will be automatically sent)
          await axiosInstance.post("/api/v1/user/refreshToken");

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          window.location.href = "/signup";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const axiosInstance = createAxiosInterceptor();
