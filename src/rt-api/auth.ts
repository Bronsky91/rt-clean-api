import { REDTAIL_API_KEY, REDTAIL_TWAPI_URL } from "@shared/constants";
import axios, { AxiosResponse } from "axios";

const { base64encode } = require("nodejs-base64");

export const authRedtail = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  const config = {
    headers: {
      Authorization: `Basic ${base64encode(
        `${REDTAIL_API_KEY}:${username}:${password}`
      )}`,
      "Content-Type": "application/json",
    },
  };

  return axios.get(REDTAIL_TWAPI_URL + "/authentication", config);
};
