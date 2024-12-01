import axios from "axios";

const createAxiosInstance = (accessToken: string) => {
  return axios.create({
    baseURL: "https://www.strava.com/api/v3",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default createAxiosInstance;
