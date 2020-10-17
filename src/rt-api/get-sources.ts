import { REDTAIL_TWAPI_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailList } from 'src/interfaces/redtail-settings.interface';

export const getSources = async (userKey: string): Promise<RedtailList[]> => {
  const result = await Axios.get(
    REDTAIL_TWAPI_URL + "/lists/sources",
    createRtApiConfig(userKey)
  );
  return result.data.sources;
};
