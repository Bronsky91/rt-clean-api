import {  REDTAIL_TWAPI_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailList } from 'src/interfaces/redtail-settings.interface';

export const getSalutations = async (
  userKey: string
): Promise<RedtailList[]> => {
  const result = await Axios.get(
    REDTAIL_TWAPI_URL + "/lists/contact_salutations",
    createRtApiConfig(userKey)
  );
  const salutations: RedtailList[] = result.data.contact_salutations.map((s: RedtailList) => ({id: s.name, name: s.name}))
  return salutations
};
