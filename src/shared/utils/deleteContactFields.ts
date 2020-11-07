import Axios from "axios";
import { contactFieldEndpoints } from "../../rt-api/post-contact";
import { REDTAIL_TWAPI_URL } from "../constants";
import logger from "../Logger";
import { createRtApiHeaders } from "./createRtApiConfig";

// Returns True if no errors encountered, otherwise returns False at first error and processing is cut short
export const deleteContactFields = async (
  userKey: string,
  contactID: number,
  fieldIDs: number[],
  endpoint: contactFieldEndpoints
): Promise<boolean> => {
  for (const id of fieldIDs) {
    try {
      const result = await Axios({
        method: "delete",
        url: REDTAIL_TWAPI_URL + `/contacts/${contactID}/${endpoint}/${id}`,
        headers: createRtApiHeaders(userKey),
      });

      if (result.status !== 200) {
        logger.error(
          `Redtail API HTTP error attempting to delete contact field via endpoint ${REDTAIL_TWAPI_URL}/contacts/${contactID}/${endpoint}/${id}: ${JSON.stringify(
            result
          )}`
        );
        return false;
      }
    } catch (error) {
      logger.error(
        `EXCEPTION attempting to delete contact field via endpoint ${REDTAIL_TWAPI_URL}/contacts/${contactID}/${endpoint}/${id}: ${JSON.stringify(
          error
        )}`
      );
      return false;
    }
  }
  return true;
};
