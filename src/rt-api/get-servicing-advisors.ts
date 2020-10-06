import { REDTAIL_API_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailServicingAdvisor } from "src/interfaces/redtail.interface";

export const getServicingAdvisors = async (
  userKey: string
): Promise<RedtailServicingAdvisor[]> => {
  const result = await Axios.get(
    REDTAIL_API_URL + "/settings/sal",
    createRtApiConfig(userKey)
  );
  return result.data;
};
