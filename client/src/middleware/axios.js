import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/";

axios.interceptors.response.use(
  (resp) => resp,
  async (err) => {
    if (err.response.status === 401) {
      const refreshToken = sessionStorage.getItem("refreshToken");

      if (refreshToken) {
        const response = await axios.post(
          "refresh-token",
          { refreshToken },
          { withCredentials: true }
        );

        if (response.status === 200) {
          const { accessToken } = response?.data;

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          // Retry the failed request with the new access token
          err.config.headers["Authorization"] = `Bearer ${accessToken}`;

          return axios(err.config);
        }
      }
    }

    return Promise.reject(err);
  }
);
