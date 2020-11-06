import Axios from "axios";
import {
  ContactsEntity,
  RedtailContactListRec,
} from "../interfaces/redtail-contact-list.interface";
import { REDTAIL_TWAPI_URL } from "../shared/constants";
import { createRtApiConfig } from "../shared/utils/createRtApiConfig";

export const searchContactsByParam = async (
  userKey: string,
  searchParam: RedtailSingleParam
): Promise<ContactsEntity[]> => {
  const result = await Axios.get(REDTAIL_TWAPI_URL + `/contacts/search`, {
    params: { page: 1, ...searchParam },
    ...createRtApiConfig(userKey),
  });
  const list: RedtailContactListRec = result.data;
  let contacts = list.contacts;

  const totalPages = Array(list.meta.total_pages - 1)
    .fill(0)
    .map((_, idx) => 2 + idx);

  const contactPromises = totalPages.map(async (page) => {
    return Axios.get(REDTAIL_TWAPI_URL + `/contacts/search`, {
      params: { page, ...searchParam },
      ...createRtApiConfig(userKey),
    }).then((res) => {
      const list: RedtailContactListRec = res.data;
      return list.contacts;
    });
  });

  const nextContacts = await Promise.all(contactPromises);
  const flatContacts = nextContacts.reduce((acc, val) => acc.concat(val), []);
  contacts = [...contacts, ...flatContacts];

  return contacts;
};

export interface RedtailIdAndLastName {
  id: number;
  last_name: string;
}
export interface RedtailSingleParam {
  status_id?: number;
  category_id?: number;
  source_id?: number;
}
