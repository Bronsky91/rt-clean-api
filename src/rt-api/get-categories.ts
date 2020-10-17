import { REDTAIL_TWAPI_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailList } from 'src/interfaces/redtail-settings.interface';

export const getCategories = async (
  userKey: string
): Promise<RedtailList[]> => {
  const result = await Axios.get(
    REDTAIL_TWAPI_URL + "/lists/contact_categories",
    createRtApiConfig(userKey)
  );
  return result.data.contact_categories;
};
