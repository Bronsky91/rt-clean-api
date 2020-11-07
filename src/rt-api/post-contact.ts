import Axios, { AxiosResponse } from "axios";
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

const enum contactFieldEndpoints {
  address = "addresses",
  email = "emails",
  phone = "phones",
  url = "urls",
}

// Returns True if no errors encountered, otherwise returns False at first error and processing is cut short
export const updateContactField = async (
  userKey: string,
  contactID: number,
  field: AddressUpdate | EmailUpdate | PhoneUpdate | UrlUpdate,
  endpoint: contactFieldEndpoints
): Promise<AxiosResponse<any>> => {
  const isNewField = field?.id === 0 ? true : false;

  try {
    if (isNewField) delete field.id;
    const result = await Axios({
      method: isNewField ? "post" : "put",
      url: isNewField
        ? REDTAIL_TWAPI_URL + `/contacts/${contactID}/${endpoint}`
        : REDTAIL_TWAPI_URL + `/contacts/${contactID}/${endpoint}/${field.id}`,
      headers: createRtApiHeaders(userKey),
      data: isNewField ? field : field,
    });
    return result;
  } catch (error) {
    logger.error(
      `Error attempting to ${
        isNewField ? "create" : "update"
      } list entry: ${JSON.stringify(field)}`
    );
    throw error;
  }
};

export const postContact = async (
  userKey: string,
  contact: RedtailContactUpdate
): Promise<boolean> => {
  // Update contact record
  try {
    const contactRecordResult = await Axios({
      method: "put",
      url: REDTAIL_TWAPI_URL + `/contacts/${contact.ContactRecord.id}`,
      headers: createRtApiHeaders(userKey),
      data: contact.ContactRecord,
    });
    if (contactRecordResult.status !== 200) {
      return false;
    }
  } catch (e) {
    logger.error("ContactRecord RT API PUT error: " + JSON.stringify(e));
    return false;
  }

  // If present, update contact's street addresses
  if (contact.Addresses) {
    for (const address of contact.Addresses) {
      try {
        const result = await updateContactField(
          userKey,
          contact.ContactRecord.id,
          address,
          contactFieldEndpoints.address
        );

        if (result.status !== 200) {
          return false;
        }
      } catch (e) {
        logger.error("Address RT API PUT error: " + JSON.stringify(e));
        return false;
      }
    }
  }

  // If present, update contact's email addresses
  if (contact.Emails) {
    for (const email of contact.Emails) {
      try {
        const result = await updateContactField(
          userKey,
          contact.ContactRecord.id,
          email,
          contactFieldEndpoints.email
        );
        if (result.status !== 200) {
          return false;
        }
      } catch (e) {
        logger.error("Email RT API PUT error: " + JSON.stringify(e));
        return false;
      }
    }
  }

  // If present, update contact's phone numbers
  if (contact.Phones) {
    for (const phone of contact.Phones) {
      try {
        // TODO: add country_code to interfaces and form
        phone.country_code = Number.isInteger(phone?.country_code)
          ? phone.country_code
          : 1;
        const result = await updateContactField(
          userKey,
          contact.ContactRecord.id,
          phone,
          contactFieldEndpoints.phone
        );
        if (result.status !== 200) {
          return false;
        }
      } catch (e) {
        logger.error("Phone RT API PUT error: " + JSON.stringify(e));
        return false;
      }
    }
  }

  // If present, update contact's url addresses
  if (contact.Urls) {
    for (const url of contact.Urls) {
      try {
        const result = await updateContactField(
          userKey,
          contact.ContactRecord.id,
          url,
          contactFieldEndpoints.url
        );
        if (result.status !== 200) {
          return false;
        }
      } catch (e) {
        logger.error("Url RT API PUT error: " + JSON.stringify(e));
        return false;
      }
    }
  }

  // If present, delete any flagged field IDs
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

  return true;
};
