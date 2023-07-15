import axios from "axios";

axios.defaults.baseURL = "http://localhost:7000/api/";

axios.interceptors.response.use(
    (resp) => resp,
    async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
            const refreshToken = sessionStorage.getItem("refreshToken");

            if (refreshToken) {
                const response = await axios.post(
                    "refresh-token",
                    {refreshToken},
                    {withCredentials: true}
                );

                if (response.status === 200) {
                    const {accessToken} = response.data;

                    axios.defaults.headers.common[
                        "Authorization"
                        ] = `Bearer ${accessToken}`;

                    // Update the refreshed access token in session storage
                    sessionStorage.setItem("refreshToken", accessToken);

                    // Retry the failed request with the new access token
                    err.config.headers["Authorization"] = `Bearer ${accessToken}`;

                    return axios(err.config);
                }
            }
        }

        return Promise.reject(err);
    }
);
