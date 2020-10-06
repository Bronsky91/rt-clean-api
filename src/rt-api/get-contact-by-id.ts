import { REDTAIL_API_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";

export const getContactById = (userKey: string, id: number) => {
  return Axios.get(
    REDTAIL_API_URL + `/contacts/${id}/masterv2`,
    createRtApiConfig(userKey)
  );
};
