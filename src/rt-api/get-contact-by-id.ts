
import Axios from "axios";
import { REDTAIL_API_URL } from '../shared/constants';
import { createRtApiConfig } from '../shared/utils/createRtApiConfig';

export const getContactById = async (userKey: string, id: number) => {
  const result = await Axios.get(
    REDTAIL_API_URL + `/contacts/${id}/master`,
    createRtApiConfig(userKey)
  );
  return result.data;
};
