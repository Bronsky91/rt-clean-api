import { REDTAIL_API_URL } from "@shared/constants";
import logger from '@shared/Logger';
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailContactUpdate, ContactFieldsRec, RedtailContactRec } from "src/interfaces/redtail.interface";

export const postContact = async (
  userKey: string,
  contact: RedtailContactUpdate
) => {
  logger.info("Received contact: " + JSON.stringify(contact));
  const result = await Axios.put(
    REDTAIL_API_URL + `/contacts/${contact.Fields.ClientID}`,
    contact.Fields,
    createRtApiConfig(userKey)
  );
  const returnedContact: RedtailContactRec = result.data;
  return returnedContact;
};
