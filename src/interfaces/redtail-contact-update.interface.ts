// Used when SENDING data to Redtail
export interface RedtailContactUpdate {
  key?: string;
  contactRecord: ContactRecordUpdate;
  addresses?: AddressUpdate[] | null;
  emails?: EmailUpdate[] | null;
  phones?: PhoneUpdate[] | null;
  urls?: UrlUpdate[] | null;
  contactFieldsToDelete: ContactFieldsToDelete;
}

export interface ContactRecordUpdate {
  id: number;
  type: string;
  salutation_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  company_name: string;
  nickname: string;
  gender_id: number;
  dob: string;
  category_id: number;
  status_id: number;
  source_id: number;
  tax_id: string;
  marital_status_id: number;
  referred_by: string;
  servicing_advisor_id: number;
  writing_advisor_id: number;
}

export interface AddressUpdate {
  key?: string;
  id?: number;
  street_address: string;
  secondary_address: string;
  city: string;
  state: string;
  zip: string;
  address_type: number;
  is_primary: boolean;
}

export interface EmailUpdate {
  key?: string;
  id?: number;
  address: string;
  email_type: number;
  is_primary: boolean;
}

export interface PhoneUpdate {
  key?: string;
  id?: number;
  country_code?: number;
  number: string;
  phone_type: number;
  is_primary: boolean;
}

export interface UrlUpdate {
  key?: string;
  id?: number;
  address: string;
  url_type: number;
}

export interface ContactFieldsToDelete {
  [key: string]: number[];
}

export enum ContactTypes {
  Individual = `Individual`,
  Business = `Business`,
  Association = `Association`,
  Trust = `Trust`,
  Union = `Union`,
}
