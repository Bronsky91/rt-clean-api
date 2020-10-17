import { REDTAIL_API_URL } from "@shared/constants";
import logger from "@shared/Logger";
import { createRtApiHeaders } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { RedtailContactUpdate } from "src/interfaces/redtail.interface";

export const postContact = async (
  userKey: string,
  contact: RedtailContactUpdate
): Promise<number> => {
  // Update contact record
  try {
    const contactRecordResult = await Axios({
      method: "put",
      url: REDTAIL_API_URL + `/contacts/${contact.ContactRecord.ClientID}`,
      headers: createRtApiHeaders(userKey),
      data: contact.ContactRecord,
    });
    if (contactRecordResult.status !== 200) {
      return 1;
    }
  } catch (e) {
    logger.error("ContactRecord RT API PUT error: " + JSON.stringify(e));
    return 1;
  }

  // If present, update contact's street addresses
  if (contact.Address) {
    contact.Address.forEach(async (item) => {
      try {
        const addressResult = await Axios({
          method: "put",
          url:
            REDTAIL_API_URL +
            `/contacts/${contact.ContactRecord.ClientID}/addresses/${item.RecID}`,
          headers: createRtApiHeaders(userKey),
          data: item,
        });
        if (addressResult.status !== 200) {
          return 2;
        }
      } catch (e) {
        logger.error("Address RT API PUT error: " + JSON.stringify(e));
        return 2;
      }
    });
  }

  // If present, update contact's email addresses
  if (contact.Internet) {
    contact.Internet.forEach(async (item) => {
      try {
        const internetResult = await Axios({
          method: "put",
          url:
            REDTAIL_API_URL +
            `/contacts/${contact.ContactRecord.ClientID}/internets/${item.RecID}`,
          headers: createRtApiHeaders(userKey),
          data: item,
        });
        if (internetResult.status !== 200) {
          return 2;
        }
      } catch (e) {
        logger.error("Internet RT API PUT error: " + JSON.stringify(e));
        return 3;
      }
    });
  }

  // If present, update contact's phone numbers
  if (contact.Phone) {
    contact.Phone.forEach(async (item) => {
      try {
        const phoneResult = await Axios({
          method: "put",
          url:
            REDTAIL_API_URL +
            `/contacts/${contact.ContactRecord.ClientID}/phones/${item.RecID}`,
          headers: createRtApiHeaders(userKey),
          data: item,
        });
        if (phoneResult.status !== 200) {
          return 2;
        }
      } catch (e) {
        logger.error("Phone RT API PUT error: " + JSON.stringify(e));
        return 4;
      }
    });
  }

  return 0;
};
