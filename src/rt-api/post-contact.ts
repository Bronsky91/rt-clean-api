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
  console.log("SUBMITTING CONTACT");
  console.log(contact);
  // Update contact record
  try {
    const result = await Axios({
      method: "put",
      url: REDTAIL_TWAPI_URL + `/contacts/${contact.contactRecord.id}`,
      headers: createRtApiHeaders(userKey),
      data: contact.contactRecord,
    });
    if (result.status !== 200) {
      return false;
    }
  } catch (e) {
    logger.error("ContactRecord RT API PUT error: " + JSON.stringify(e));
    return false;
  }

  // Update or create addresses, emails, phones, urls
  const updateResult = await createOrUpdateContactFields(userKey, contact);
  if (!updateResult) return false;

  // Delete flagged addresses, emails, phones, urls
  const deleteResult = await deleteContactFields(
    userKey,
    contact.contactRecord.id,
    contact.contactFieldsToDelete
  );
  if (!deleteResult) return false;

  return true;
};
