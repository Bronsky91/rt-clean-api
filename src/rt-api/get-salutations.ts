import { REDTAIL_API_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailSalutation } from "src/interfaces/redtail.interface";

export const getSalutations = async (
  userKey: string
): Promise<RedtailSalutation[]> => {
  const result = await Axios.get(
    REDTAIL_API_URL + "/settings/salutations",
    createRtApiConfig(userKey)
  );
  return result.data;
};
