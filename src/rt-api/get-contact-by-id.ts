import { REDTAIL_API_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";

export const getContactById = async (userKey: string, id: number) => {
  const result = await Axios.get(
    REDTAIL_API_URL + `/contacts/${id}/master`,
    createRtApiConfig(userKey)
  );
  return result.data;
};
