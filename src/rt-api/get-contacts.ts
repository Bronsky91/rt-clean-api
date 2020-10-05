import { REDTAIL_API_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiconfig";
import Axios from "axios";

export const getContactsByPage = (userKey: string, pageNumber: number) => {
  return Axios.get(
    REDTAIL_API_URL + `/contacts?page=${pageNumber}`,
    createRtApiConfig(userKey)
  );
};
