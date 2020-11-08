import { REDTAIL_API_KEY } from "../constants";

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

export const createRtApiContactConfig = (userKey: string) => {
  const config = {
    headers: {
      Authorization: `Userkeyauth ${base64encode(
        `${REDTAIL_API_KEY}:${userKey}`
      )}`,
      include: "addresses,phones,emails,urls",
      "Content-Type": "application/json",
    },
  };
  return config;
};

export const createRtApiHeaders = (userKey: string) => {
  const config = {
    Authorization: `Userkeyauth ${base64encode(
      `${REDTAIL_API_KEY}:${userKey}`
    )}`,
    "Content-Type": "application/json",
  };
  return config;
};
