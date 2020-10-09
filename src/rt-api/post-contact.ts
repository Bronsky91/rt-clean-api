import { REDTAIL_API_URL } from "@shared/constants";
import logger from "@shared/Logger";
import { createRtApiConfig } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import {
  RedtailContactUpdate,
  ContactFieldsRec,
  RedtailContactRec,
} from "src/interfaces/redtail.interface";

export const postContact = async (
  userKey: string,
  contact: RedtailContactUpdate
) => {
  logger.info("Received contact: " + JSON.stringify(contact));

  // Update contact
  const contactRecordResult = await Axios.put(
    REDTAIL_API_URL + `/contacts/${contact.ContactRecord.ClientID}`,
    contact.ContactRecord,
    createRtApiConfig(userKey)
  );
  const returnedContactRecord: RedtailContactRec = contactRecordResult.data;

  // If present, update contact's street addresses
  if (contact.Address) {
    contact.Address.forEach(async (item) => {
      const addressResult = await Axios.put(
        REDTAIL_API_URL + `/contacts/${item.ClientID}/addresses/${item.RecID}`,
        item,
        createRtApiConfig(userKey)
      );
    });
  }

  // If present, update contact's email addresses
  if (contact.Internet) {
    contact.Internet.forEach(async (item) => {
      const internetResult = await Axios.put(
        REDTAIL_API_URL + `/contacts/${item.ClientID}/internets/${item.RecID}`,
        item,
        createRtApiConfig(userKey)
      );
    });
  }

  // If present, update contact's phone numbers
  if (contact.Phone) {
    contact.Phone.forEach(async (item) => {
      const phoneResult = await Axios.put(
        REDTAIL_API_URL + `/contacts/${item.ClientID}/phones/${item.RecID}`,
        item,
        createRtApiConfig(userKey)
      );
    });
  }

  return returnedContactRecord;
};
