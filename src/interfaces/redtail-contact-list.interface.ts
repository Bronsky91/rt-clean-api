export interface RedtailContactListRec {
  contacts?: (ContactsEntity)[] | null;
  meta: Meta;
}
export interface ContactsEntity {
  id: number;
  type: string;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  company_name?: string | null;
  full_name: string;
  nickname?: string | null;
  suffix_id?: null;
  suffix?: null;
  job_title?: string | null;
  favorite: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
  salutation_id?: number | null;
  salutation?: string | null;
  source_id?: number | null;
  source?: string | null;
  status_id: number;
  status: string;
  category_id?: number | null;
  category?: string | null;
  gender_id?: number | null;
  gender?: string | null;
  spouse_name?: string | null;
  tax_id?: string | null;
  dob?: null;
  death_date?: null;
  client_since?: null;
  client_termination_date?: null;
  marital_status_id?: number | null;
  marital_status?: string | null;
  marital_date?: null;
  employer_id?: number | null;
  employer?: null;
  designation?: string | null;
  referred_by?: string | null;
  servicing_advisor_id?: null;
  servicing_advisor?: null;
  writing_advisor_id?: null;
  writing_advisor?: null;
  added_by: number;
  family?: Family | null;
  addresses?: (AddressesEntity | null)[] | null;
  phones?: (PhonesEntity | null)[] | null;
  emails?: (EmailsEntity | null)[] | null;
  urls?: (UrlsEntity | null)[] | null;
  tag_memberships?: (TagMembershipsEntity | null)[] | null;
}
export interface Family {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  members?: (MembersEntity)[] | null;
}
export interface MembersEntity {
  id: number;
  family_id: number;
  contact_id: number;
  relationship?: number | null;
  relationship_name?: string | null;
  hoh: boolean;
  full_name: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}
export interface AddressesEntity {
  id: number;
  addressable_id: number;
  addressable_type: string;
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
  created_at: string;
  updated_at: string;
}
export interface PhonesEntity {
  id: number;
  callable_id: number;
  callable_type: string;
  country_code: number;
  number: string;
  extension?: string | null;
  phone_type: number;
  phone_type_description: string;
  speed_dial?: string | null;
  is_preferred: boolean;
  is_primary: boolean;
  custom_type_title?: string | null;
  description: string;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}
export interface EmailsEntity {
  id: number;
  emailable_id: number;
  emailable_type: string;
  address: string;
  email_type: number;
  email_type_description: string;
  custom_type_title?: string | null;
  description?: string | null;
  is_primary: boolean;
  is_preferred: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}
export interface UrlsEntity {
  id: number;
  contact_id: number;
  address: string;
  url_type: number;
  url_type_description: string;
  custom_type_title: string;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}
export interface TagMembershipsEntity {
  id: number;
  name: string;
  description?: null;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}
export interface Meta {
  total_records: number;
  total_pages: number;
}
