import Axios, { AxiosResponse } from "axios";
import { RedtailContactUpdate } from "../interfaces/redtail-contact-update.interface";
import { REDTAIL_TWAPI_URL } from "../shared/constants";
import logger from "../shared/Logger";
import { createRtApiHeaders } from "../shared/utils/createRtApiConfig";
import { createOrUpdateContactFields } from "../shared/utils/createOrUpdateContactFields";
import { deleteContactFields } from "../shared/utils/deleteContactFields";

export const enum contactFieldEndpoints {
  address = "addresses",
  email = "emails",
  phone = "phones",
  url = "urls",
}

// Returns True if no errors encountered, otherwise returns False at first error and processing is cut short
export const postContact = async (
  userKey: string,
  contact: RedtailContactUpdate
): Promise<boolean> => {
  // Update contact record
  try {
    const result = await Axios({
      method: "put",
      url: REDTAIL_TWAPI_URL + `/contacts/${contact.ContactRecord.id}`,
      headers: createRtApiHeaders(userKey),
      data: contact.ContactRecord,
    });
    if (result.status !== 200) {
      return false;
    }
  } catch (e) {
    logger.error("ContactRecord RT API PUT error: " + JSON.stringify(e));
    return false;
  }

  // If present, update contact's street addresses
  if (contact?.Addresses) {
    const result = await createOrUpdateContactFields(
      userKey,
      contact.ContactRecord.id,
      contact.Addresses,
      contactFieldEndpoints.address
    );
    if (!result) return false;
  }

  // If present, update contact's email addresses
  if (contact.Emails) {
    const result = await createOrUpdateContactFields(
      userKey,
      contact.ContactRecord.id,
      contact.Emails,
      contactFieldEndpoints.email
    );
    if (!result) return false;
  }

  // If present, update contact's phone numbers
  if (contact.Phones) {
    // TODO: add country_code to interfaces and form, remove below loop
    for (const phone of contact.Phones) {
      phone.country_code = Number.isInteger(phone?.country_code)
        ? phone.country_code
        : 1;
    }
    const result = await createOrUpdateContactFields(
      userKey,
      contact.ContactRecord.id,
      contact.Phones,
      contactFieldEndpoints.phone
    );
    if (!result) return false;
  }

  // If present, update contact's url addresses
  if (contact.Urls) {
    const result = await createOrUpdateContactFields(
      userKey,
      contact.ContactRecord.id,
      contact.Urls,
      contactFieldEndpoints.url
    );
    if (!result) return false;
  }

  // If present, delete any flagged address IDs
  if (contact.contactFieldsToDelete?.addresses) {
    const result = await deleteContactFields(
      userKey,
      contact.ContactRecord.id,
      contact.contactFieldsToDelete.addresses,
      contactFieldEndpoints.address
    );
    if (!result) return false;
  }
  // If present, delete any flagged email IDs
  if (contact.contactFieldsToDelete?.emails) {
    const result = await deleteContactFields(
      userKey,
      contact.ContactRecord.id,
      contact.contactFieldsToDelete.emails,
      contactFieldEndpoints.email
    );
    if (!result) return false;
  }
  // If present, delete any flagged phone IDs
  if (contact.contactFieldsToDelete?.phones) {
    const result = await deleteContactFields(
      userKey,
      contact.ContactRecord.id,
      contact.contactFieldsToDelete.phones,
      contactFieldEndpoints.phone
    );
    if (!result) return false;
  }
  // If present, delete any flagged url IDs
  if (contact.contactFieldsToDelete?.urls) {
    const result = await deleteContactFields(
      userKey,
      contact.ContactRecord.id,
      contact.contactFieldsToDelete.urls,
      contactFieldEndpoints.url
    );
    if (!result) return false;
  }

  return true;
};
