import Axios from "axios";
import { RedtailContactUpdate } from "../../interfaces/redtail-contact-update.interface";
import { REDTAIL_TWAPI_URL } from "../constants";
import logger from "../Logger";
import { createRtApiHeaders } from "./createRtApiConfig";

const validKeys: string[] = ["addresses", "emails", "phones", "urls"];
// Returns True if no errors encountered, otherwise returns False at first error and processing is cut short
export const createOrUpdateContactFields = async (
  userKey: string,
  contact: RedtailContactUpdate
): Promise<boolean> => {
  for (const key in contact) {
    // If the key doesn't equal address, emails, phones, or urls continue to next iteration
    if (isNotValidContactField(key)) continue;

    const fieldName = getContactField(key);
    const contactFields = contact[fieldName] || [];

    for (const field of contactFields) {
      if (field.key) delete field.key;

      const isNewField = field?.id === 0;
      try {
        if (isNewField) delete field.id;
        const result = await Axios({
          method: isNewField ? "post" : "put",
          url: isNewField
            ? REDTAIL_TWAPI_URL +
              `/contacts/${contact.contactRecord.id}/${fieldName}`
            : REDTAIL_TWAPI_URL +
              `/contacts/${contact.contactRecord.id}/${fieldName}/${field.id}`,
          headers: createRtApiHeaders(userKey),
          data: field,
        });
        if (result.status !== 200 && result.status !== 201) {
          logger.error(
            `Redtail API HTTP error attempting to ${
              isNewField ? "create" : "update"
            } contact field ${JSON.stringify(field)}: `
          );
          console.log(result);
          return false;
        }
      } catch (error) {
        logger.error(
          `EXCEPTION attempting to ${
            isNewField ? "create" : "update"
          } contact field ${JSON.stringify(field)}: `
        );
        console.log(error);
        return false;
      }
    }
  }
  return true;
};

const getContactField = (field: string) => {
  const validField = validKeys.find((key) => field === key) as
    | "addresses"
    | "emails"
    | "phones"
    | "urls";
  return validField;
};

const isNotValidContactField = (field: string) => {
  return !validKeys.includes(field);
};
