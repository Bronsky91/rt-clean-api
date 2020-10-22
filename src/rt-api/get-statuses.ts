
import Axios from "axios";
import { RedtailList } from '../interfaces/redtail-settings.interface';
import { REDTAIL_TWAPI_URL } from '../shared/constants';
import { createRtApiConfig } from '../shared/utils/createRtApiConfig';

export const getStatuses = async (
  userKey: string
): Promise<RedtailList[]> => {
  const result = await Axios.get(
    REDTAIL_TWAPI_URL + "/lists/contact_statuses",
    createRtApiConfig(userKey)
  );
  return result.data.contact_statuses;
};
