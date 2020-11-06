import Axios, { AxiosResponse } from "axios";
import { RedtailList } from "../interfaces/redtail-settings.interface";
import { REDTAIL_TWAPI_URL } from "../shared/constants";
import logger from "../shared/Logger";
import { createRtApiConfig } from "../shared/utils/createRtApiConfig";

export const getSalutations = async (
  userKey: string
): Promise<RedtailList[]> => {
  const pageOneRes: AxiosResponse<any> = await Axios.get(
    REDTAIL_TWAPI_URL + "/lists/contact_salutations?page=1",
    createRtApiConfig(userKey)
  );
  let salutations: RedtailList[] = pageOneRes.data.contact_salutations.map(
    (s: RedtailList) => ({ id: s.id, name: s.name })
  );

  const totalPages = Array(pageOneRes.data.meta.total_pages - 1)
    .fill(0)
    .map((_, idx) => 2 + idx);
  const salutationPromises = totalPages.map(async (page) => {
    return Axios.get(
      REDTAIL_TWAPI_URL + `/lists/contact_salutations?page=${page}`,
      createRtApiConfig(userKey)
    ).then((res) => {
      const sal: RedtailList[] = res.data.contact_salutations.map(
        (s: RedtailList) => ({ id: s.id, name: s.name })
      );
      return sal;
    });
  });

  const nextSalutations = await Promise.all(salutationPromises);
  const flatSalutations = nextSalutations.reduce(
    (acc, val) => acc.concat(val),
    []
  );
  salutations = [...salutations, ...flatSalutations];
  return salutations;
};
