import { REDTAIL_API_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailCategory } from "src/interfaces/redtail.interface";

export const getCategories = async (
  userKey: string
): Promise<RedtailCategory[]> => {
  const result = await Axios.get(
    REDTAIL_API_URL + "/settings/mccl",
    createRtApiConfig(userKey)
  );
  return result.data;
};
