import { REDTAIL_API_URL } from "@shared/constants";
import logger from "@shared/Logger";
import { createRtApiHeaders } from "@shared/utils/createRtApiConfig";
import Axios from "axios";
import { AddressUpdate, InternetUpdate, PhoneUpdate, RedtailContactUpdate } from 'src/interfaces/redtail-contact-update.interface';

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
    contact.Address.forEach(async (addressItem: AddressUpdate) => {
      try {
        const addressResult = await Axios({
          method: "put",
          url:
            REDTAIL_API_URL +
            `/contacts/${contact.ContactRecord.ClientID}/addresses/${addressItem.RecID}`,
          headers: createRtApiHeaders(userKey),
          data: addressItem,
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
    contact.Internet.forEach(async (internet: InternetUpdate) => {
      try {
        const internetResult = await Axios({
          method: "put",
          url:
            REDTAIL_API_URL +
            `/contacts/${contact.ContactRecord.ClientID}/internets/${internet.RecID}`,
          headers: createRtApiHeaders(userKey),
          data: internet,
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
    contact.Phone.forEach(async (phone: PhoneUpdate) => {
      try {
        const phoneResult = await Axios({
          method: "put",
          url:
            REDTAIL_API_URL +
            `/contacts/${contact.ContactRecord.ClientID}/phones/${phone.RecID}`,
          headers: createRtApiHeaders(userKey),
          data: phone,
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

  if (contact.contactFieldsToDelete){
    console.log(contact.contactFieldsToDelete)
    if(contact.contactFieldsToDelete.emailAddresses){
      for(const internetRecId of contact.contactFieldsToDelete.emailAddresses){
        const internetResult = await Axios({
          method: "post",
          url:
            REDTAIL_API_URL +
            `/contacts/${contact.ContactRecord.ClientID}/internets/${internetRecId}?Type=email`,
          headers: createRtApiHeaders(userKey),
        });
        console.log(internetResult.status)
      }
    }
    if(contact.contactFieldsToDelete.phoneNumbers){
      for(const phoneRecId of contact.contactFieldsToDelete.phoneNumbers){
        const phoneResult = await Axios({
          method: "post",
          url:
            REDTAIL_API_URL +
            `/contacts/${contact.ContactRecord.ClientID}/phones/${phoneRecId}`,
          headers: createRtApiHeaders(userKey),
        });
        console.log(phoneResult.status)
      }
    }
    if(contact.contactFieldsToDelete.streetAddresses){
      for(const addressRecId of contact.contactFieldsToDelete.streetAddresses){
        const addressResult = await Axios({
          method: "post",
          url:
            REDTAIL_API_URL +
            `/contacts/${contact.ContactRecord.ClientID}/addresses/${addressRecId}`,
          headers: createRtApiHeaders(userKey),
        });
        console.log(addressResult.status)
      }
    }
  }

  return 0;
};
