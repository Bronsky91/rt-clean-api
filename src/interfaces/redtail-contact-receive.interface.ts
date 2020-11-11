// Used when RECEIVING data from Redtail
export interface RedtailContactRec {
  id: number;
  type: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  company_name?: null;
  full_name: string;
  nickname: string;
  suffix_id?: null;
  suffix?: null;
  job_title: string;
  favorite: boolean;
  deleted: boolean;
  created_at: string; //"2020-09-10T23:32:29.000Z",
  updated_at: string; //"2020-10-28T20:52:54.000Z",
  salutation_id: number;
  salutation: string;
  source_id: number;
  source: string;
  status_id: number;
  status: string;
  category_id: number;
  category: string;
  gender_id: number;
  gender: string;
  spouse_name?: null;
  tax_id: string;
  dob: string; //"1995-10-01",
  death_date?: null;
  client_since?: null;
  client_termination_date?: null;
  marital_status_id: number; //7,
  marital_status: string; //"Unknown",
  marital_date?: null;
  employer_id: number;
  employer?: null;
  designation: string;
  referred_by: string;
  servicing_advisor_id: number;
  servicing_advisor: string;
  writing_advisor_id: number;
  writing_advisor: string;
  added_by: number;
  addresses?: AddressRec[] | null;
  phones?: PhoneRec[] | null;
  emails?: EmailRec[] | null;
  urls?: UrlRec[] | null;
}

export interface AddressRec {
  id: number;
  addressable_id: number;
  addressable_type: string; //"Crm::Contact"
  street_address: string;
  secondary_address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  address_type: number;
  address_type_description: string;
  custom_type_title: string;
  description: string;
  is_primary: boolean;
  is_preferred: boolean;
  deleted: boolean;
  created_at: string; //"2020-10-13T20:19:19.000Z",
  updated_at: string; //"2020-10-28T20:52:55.000Z"
}

export interface PhoneRec {
  id: number;
  callable_id: number;
  callable_type: string; //"Crm::Contact",
  country_code: number;
  number: string;
  extension?: null;
  phone_type: number;
  phone_type_description: string;
  speed_dial?: null;
  is_preferred: boolean;
  is_primary: boolean;
  custom_type_title?: null;
  description: string;
  deleted: boolean;
  created_at: string; //"2020-09-10T23:32:30.000Z",
  updated_at: string; //"2020-10-28T20:52:55.000Z"
}

export interface EmailRec {
  id: number;
  emailable_id: number;
  emailable_type: string; //"Crm::Contact",
  address: string;
  email_type: number;
  email_type_description: string;
  custom_type_title: string;
  description: string;
  is_primary: boolean;
  is_preferred: boolean;
  deleted: boolean;
  created_at: string; //"2020-09-10T23:32:30.000Z",
  updated_at: string; //"2020-10-28T20:52:55.000Z"
}

export interface UrlRec {
  id: number;
  contact_id: number;
  address: string;
  url_type: number;
  url_type_description: string;
  custom_type_title: string;
  deleted: boolean;
  created_at: string; //"2020-10-13T20:16:07.000Z",
  updated_at: string; //"2020-10-18T00:18:42.000Z"
}
