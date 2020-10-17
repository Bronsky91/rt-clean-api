import { REDTAIL_TWAPI_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailList } from 'src/interfaces/redtail-settings.interface';

export const getServicingAdvisors = async (
  userKey: string
): Promise<RedtailList[]> => {
  const result = await Axios.get(
    REDTAIL_TWAPI_URL + "/lists/servicing_advisors",
    createRtApiConfig(userKey)
  );
  return result.data.servicing_advisors;
};
