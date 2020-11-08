import Axios from "axios";
import { ContactFieldsToDelete } from "../../interfaces/redtail-contact-update.interface";
import { contactFieldEndpoints } from "../../rt-api/post-contact";
import { REDTAIL_TWAPI_URL } from "../constants";
import logger from "../Logger";
import { createRtApiHeaders } from "./createRtApiConfig";

// Returns True if no errors encountered, otherwise returns False at first error and processing is cut short
export const deleteContactFields = async (
  userKey: string,
  contactID: number,
  contactFieldsToDelete: ContactFieldsToDelete
): Promise<boolean> => {
  for (const field in contactFieldsToDelete) {
    for (const id of contactFieldsToDelete[field]) {
      try {
        const result = await Axios({
          method: "delete",
          url: REDTAIL_TWAPI_URL + `/contacts/${contactID}/${field}/${id}`,
          headers: createRtApiHeaders(userKey),
        });

        if (result.status !== 204) {
          logger.error(
            `Redtail API HTTP error attempting to delete contact field via endpoint ${REDTAIL_TWAPI_URL}/contacts/${contactID}/${field}/${id}: `
          );
          console.log(result);
          return false;
        }
      } catch (error) {
        logger.error(
          `EXCEPTION attempting to delete contact field via endpoint ${REDTAIL_TWAPI_URL}/contacts/${contactID}/${field}/${id}: `
        );
        console.log(error);
        return false;
      }
    }
  }
  return true;
};
