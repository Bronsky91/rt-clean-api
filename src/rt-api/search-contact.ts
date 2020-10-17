import {  REDTAIL_TWAPI_URL } from "@shared/constants";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import {  RedtailContactListRec } from 'src/interfaces/redtail-contact-list.interface';

export const searchContactsByParam = async (
  userKey: string,
  searchParam: RedtailSearchParam 
) => {
  const result = await Axios.get(
    REDTAIL_TWAPI_URL + `/contacts/search`,
    {params: {page: 1, ...searchParam}, ...createRtApiConfig(userKey)}
  );
  const list: RedtailContactListRec = result.data;
  let contacts = list.contacts

  const totalPages = Array(list.meta.total_pages - 2 + 1).fill(0).map((_, idx) => 2 + idx)

  const contactPromises = totalPages.map( async (page) => {
    return Axios.get(
      REDTAIL_TWAPI_URL + `/contacts/search`,
      {params: {page, ...searchParam}, ...createRtApiConfig(userKey)}
    ).then(res => {
      const list: RedtailContactListRec = res.data
      return list.contacts
    })
  })

  const nextContacts = await Promise.all(contactPromises)
  const flatContacts = nextContacts.reduce((acc, val) => acc.concat(val), []);
  contacts = [...contacts, ...flatContacts]
  
  const contactsByLastName = contacts.map(contact => ({id: contact.id, last_name: contact.last_name}))
  return contactsByLastName
};

export interface RedtailSearchParam {
  status_id?: number,
  category_id?: number,
  source_id?: number,
}