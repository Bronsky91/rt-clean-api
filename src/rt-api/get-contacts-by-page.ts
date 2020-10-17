import {  REDTAIL_TWAPI_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";

export const getContactsByPage = async (
  userKey: string,
  pageNumber: number
) => {
  const result = await Axios.get(
    REDTAIL_TWAPI_URL + `/contacts?page=${pageNumber}`,
    createRtApiConfig(userKey)
  );
  return result.data;
};
