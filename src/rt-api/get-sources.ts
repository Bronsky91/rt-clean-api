import { REDTAIL_API_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailSource } from "src/interfaces/redtail.interface";

export const getSources = async (userKey: string): Promise<RedtailSource[]> => {
  const result = await Axios.get(
    REDTAIL_API_URL + "/settings/mcsl",
    createRtApiConfig(userKey)
  );
  return result.data;
};
