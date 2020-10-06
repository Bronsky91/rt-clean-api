import { REDTAIL_API_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailStatus } from "src/interfaces/redtail.interface";

export const getStatuses = async (
  userKey: string
): Promise<RedtailStatus[]> => {
  const result = await Axios.get(
    REDTAIL_API_URL + "/settings/csl",
    createRtApiConfig(userKey)
  );
  return result.data;
};
