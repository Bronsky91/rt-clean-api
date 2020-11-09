import {
  PhoneUpdate,
  RedtailContactUpdate,
} from "../../interfaces/redtail-contact-update.interface";

// Prepares a contact's phone numbers for Redtail consumption
export const preparePhoneNumbers = (
  contact: RedtailContactUpdate
): RedtailContactUpdate => {
  if (contact?.phones) {
    const newPhones: PhoneUpdate[] = [...contact.phones];
    for (const phone of newPhones) {
      if (
        phone?.number &&
        phone?.country_code &&
        phone.number.length >= phone.country_code.toString().length
      ) {
        phone.number = phone.number.substring(
          phone.country_code.toString().length
        );
      }
    }
    const updatedContact = { ...contact, ["phones"]: newPhones };
    return updatedContact;
  } else {
    return contact;
  }
};
