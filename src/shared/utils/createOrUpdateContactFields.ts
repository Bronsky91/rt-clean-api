import Axios from "axios";
import {
  AddressUpdate,
  EmailUpdate,
  PhoneUpdate,
  UrlUpdate,
} from "../../interfaces/redtail-contact-update.interface";
import { contactFieldEndpoints } from "../../rt-api/post-contact";
import { REDTAIL_TWAPI_URL } from "../constants";
import logger from "../Logger";
import { createRtApiHeaders } from "./createRtApiConfig";

// Returns True if no errors encountered, otherwise returns False at first error and processing is cut short
export const createOrUpdateContactFields = async (
  userKey: string,
  contactID: number,
  fields: AddressUpdate[] | EmailUpdate[] | PhoneUpdate[] | UrlUpdate[],
  endpoint: contactFieldEndpoints
): Promise<boolean> => {
  for (const field of fields) {
    if (field.key) delete field.key;

    const isNewField = field?.id === 0 ? true : false;
    try {
      if (isNewField) delete field.id;
      const result = await Axios({
        method: isNewField ? "post" : "put",
        url: isNewField
          ? REDTAIL_TWAPI_URL + `/contacts/${contactID}/${endpoint}`
          : REDTAIL_TWAPI_URL +
            `/contacts/${contactID}/${endpoint}/${field.id}`,
        headers: createRtApiHeaders(userKey),
        data: field,
      });
      if (result.status !== 200) {
        logger.error(
          `Redtail API HTTP error attempting to ${
            isNewField ? "create" : "update"
          } contact field ${JSON.stringify(field)}: ${JSON.stringify(result)}`
        );
        return false;
      }
    } catch (error) {
      logger.error(
        `EXCEPTION attempting to ${
          isNewField ? "create" : "update"
        } contact field ${JSON.stringify(field)}: ${JSON.stringify(error)}`
      );
      return false;
    }
  }
  return true;
};
