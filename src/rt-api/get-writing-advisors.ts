import { REDTAIL_API_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailWritingAdvisor } from "src/interfaces/redtail.interface";

export const getWritingAdvisors = async (
  userKey: string
): Promise<RedtailWritingAdvisor[]> => {
  const result = await Axios.get(
    REDTAIL_API_URL + "/settings/wal",
    createRtApiConfig(userKey)
  );
  return result.data;
};
