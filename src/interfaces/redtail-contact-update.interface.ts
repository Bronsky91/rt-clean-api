// Used when SENDING data to Redtail
export interface RedtailContactUpdate {
  ContactRecord: ContactRecordUpdate;
  Addresses?: AddressUpdate[] | null;
  Emails?: EmailUpdate[] | null;
  Phones?: PhoneUpdate[] | null;
  Urls?: UrlUpdate[] | null;
  contactFieldsToDelete: {
    addresses?: number[];
    emails?: number[];
    phones?: number[];
    urls?: number[];
  };
}

export interface ContactRecordUpdate {
  id: number;
  type: string;
  source_id: number;
  status_id: number;
  category_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  tax_id: string;
  dob: string;
}

export interface AddressUpdate {
  id: number;
  street_address: string;
  secondary_address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  address_type: number;
  custom_type_title: string;
  description: string;
  is_primary: boolean;
  is_preferred: boolean;
}

export interface EmailUpdate {
  id: number;
  emailable_id: number;
  address: string;
  email_type: number;
  custom_type_title: string;
  description: string;
  is_primary: boolean;
  is_preferred: boolean;
}

export interface PhoneUpdate {
  id: number;
  country_code: number;
  number: string;
  extension: string;
  phone_type: number;
  speed_dial: string;
  is_preferred: boolean;
  is_primary: boolean;
  custom_type_title: string;
  description: string;
}

export interface UrlUpdate {
  id: number;
  address: string;
  url_type: number;
  custom_type_title: string;
}
