import Axios from "axios";
import { REDTAIL_TWAPI_URL } from "../shared/constants";
import { createRtApiContactConfig } from "../shared/utils/createRtApiConfig";

export const deleteContactById = async (userKey: string, id: number) => {
  try {
    const result = await Axios.delete(
      REDTAIL_TWAPI_URL + `/contacts/${id}`,
      createRtApiContactConfig(userKey)
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
