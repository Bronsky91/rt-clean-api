
import Axios from "axios";
import { RedtailList } from '../interfaces/redtail-settings.interface';
import { REDTAIL_TWAPI_URL } from '../shared/constants';
import { createRtApiConfig } from '../shared/utils/createRtApiConfig';

export const getWritingAdvisors = async (
  userKey: string
): Promise<RedtailList[]> => {
  const result = await Axios.get(
    REDTAIL_TWAPI_URL + "/lists/writing_advisors",
    createRtApiConfig(userKey)
  );
  return result.data.writing_advisors;
};
