import { REDTAIL_API_KEY } from "@shared/constants";

const { base64encode } = require("nodejs-base64");

export const createRtApiConfig = (userKey: string) => {
  const config = {
    headers: {
      Authorization: `Userkeyauth ${base64encode(
        `${REDTAIL_API_KEY}:${userKey}`
      )}`,
      "Content-Type": "application/json",
    },
  };
  return config;
};
