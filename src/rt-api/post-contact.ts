import Axios from "axios";
import {
  AddressUpdate,
  EmailUpdate,
  PhoneUpdate,
  UrlUpdate,
  RedtailContactUpdate,
} from "../interfaces/redtail-contact-update.interface";
import { REDTAIL_TWAPI_URL } from "../shared/constants";
import logger from "../shared/Logger";
import { createRtApiHeaders } from "../shared/utils/createRtApiConfig";

export const postContact = async (
  userKey: string,
  contact: RedtailContactUpdate
): Promise<number> => {
  // Update contact record
  try {
    const contactRecordResult = await Axios({
      method: "put",
      url: REDTAIL_TWAPI_URL + `/contacts/${contact.ContactRecord.id}`,
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
  if (contact.Addresses) {
    contact.Addresses.forEach(async (address: AddressUpdate) => {
      try {
        const addressResult = await Axios({
          method: "put",
          url:
            REDTAIL_TWAPI_URL +
            `/contacts/${contact.ContactRecord.id}/addresses/${address.id}`,
          headers: createRtApiHeaders(userKey),
          data: address,
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
  if (contact.Emails) {
    contact.Emails.forEach(async (email: EmailUpdate) => {
      try {
        const emailResult = await Axios({
          method: "put",
          url:
            REDTAIL_TWAPI_URL +
            `/contacts/${contact.ContactRecord.id}/emails/${email.id}`,
          headers: createRtApiHeaders(userKey),
          data: email,
        });
        if (emailResult.status !== 200) {
          return 3;
        }
      } catch (e) {
        logger.error("Email RT API PUT error: " + JSON.stringify(e));
        return 3;
      }
    });
  }

  // If present, update contact's phone numbers
  if (contact.Phones) {
    contact.Phones.forEach(async (phone: PhoneUpdate) => {
      try {
        const phoneResult = await Axios({
          method: "put",
          url:
            REDTAIL_TWAPI_URL +
            `/contacts/${contact.ContactRecord.id}/phones/${phone.id}`,
          headers: createRtApiHeaders(userKey),
          data: phone,
        });
        if (phoneResult.status !== 200) {
          return 4;
        }
      } catch (e) {
        logger.error("Phone RT API PUT error: " + JSON.stringify(e));
        return 4;
      }
    });
  }

  // If present, update contact's url addresses
  if (contact.Urls) {
    contact.Urls.forEach(async (url: UrlUpdate) => {
      try {
        const urlResult = await Axios({
          method: "put",
          url:
            REDTAIL_TWAPI_URL +
            `/contacts/${contact.ContactRecord.id}/urls/${url.id}`,
          headers: createRtApiHeaders(userKey),
          data: url,
        });
        if (urlResult.status !== 200) {
          return 5;
        }
      } catch (e) {
        logger.error("Url RT API PUT error: " + JSON.stringify(e));
        return 5;
      }
    });
  }

  if (contact.contactFieldsToDelete) {
    if (contact.contactFieldsToDelete.addresses) {
      for (const addressId of contact.contactFieldsToDelete.addresses) {
        const addressResult = await Axios({
          method: "delete",
          url:
            REDTAIL_TWAPI_URL +
            `/contacts/${contact.ContactRecord.id}/addresses/${addressId}`,
          headers: createRtApiHeaders(userKey),
        });
      }
    }
    if (contact.contactFieldsToDelete.emails) {
      for (const emailId of contact.contactFieldsToDelete.emails) {
        const emailResult = await Axios({
          method: "delete",
          url:
            REDTAIL_TWAPI_URL +
            `/contacts/${contact.ContactRecord.id}/emails/${emailId}`,
          headers: createRtApiHeaders(userKey),
        });
      }
    }
    if (contact.contactFieldsToDelete.phones) {
      for (const phoneId of contact.contactFieldsToDelete.phones) {
        const phoneResult = await Axios({
          method: "delete",
          url:
            REDTAIL_TWAPI_URL +
            `/contacts/${contact.ContactRecord.id}/phones/${phoneId}`,
          headers: createRtApiHeaders(userKey),
        });
      }
    }
    if (contact.contactFieldsToDelete.urls) {
      for (const UrlId of contact.contactFieldsToDelete.urls) {
        const urlResult = await Axios({
          method: "delete",
          url:
            REDTAIL_TWAPI_URL +
            `/contacts/${contact.ContactRecord.id}/urls/${UrlId}`,
          headers: createRtApiHeaders(userKey),
        });
      }
    }
  }

  return 0;
};
