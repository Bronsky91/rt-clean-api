import Axios from "axios";
import { REDTAIL_TWAPI_URL } from "../shared/constants";
import { createRtApiContactConfig } from "../shared/utils/createRtApiConfig";

export const getContactById = async (userKey: string, id: number) => {
  const result = await Axios.get(
    REDTAIL_TWAPI_URL + `/contacts/${id}`,
    createRtApiContactConfig(userKey)
  );
  return result.data;
};
