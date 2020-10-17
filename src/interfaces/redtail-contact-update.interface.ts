// Used when SENDING data to Redtail
export interface RedtailContactUpdate {
  Address?: AddressUpdate[] | null;
  ContactRecord: ContactFieldsUpdate;
  Internet?: InternetUpdate[] | null;
  Phone?: PhoneUpdate[] | null;
}

export interface AddressUpdate {
  Address1: string;
  Address2: string;
  City: string;
  ClientID: number;
  Label: string;
  Preferred: boolean;
  Primary: boolean;
  RecID: number;
  SharedAddress: boolean;
  State: string;
  TypeID: string;
  Zip: string;
}

export interface ContactFieldsUpdate {
  AnniversaryDate: string;
  CategoryID: number;
  ClientID: number;
  ClientSinceDate: string;
  CompanyID: number;
  DateOfBirth: string;
  Designation: string;
  Family: boolean;
  FamilyHeadID: number;
  Familyname: string;
  Firstname: string;
  Gender: string;
  JobTitle: string;
  Lastname: string;
  MaritalStatus: string;
  Middlename: string;
  Name: string;
  Nickname: string;
  ReferredBy: string;
  Salutation: string;
  ServicingAdvisorID: number;
  SourceID: number;
  StatusID: number;
  Suffix: string;
  TaxID: string;
  TypeID: string;
  WritingAdvisorID: number;
}

export interface InternetUpdate {
  Address: string;
  ClientID: number;
  Label: string;
  Preferred: boolean;
  RecID: number;
  TypeID: number;
  Primary: boolean;
}

export interface PhoneUpdate {
  ClientID: number;
  DisplayOrder: number;
  Extension: string;
  Label: string;
  Number: string;
  Preferred: boolean;
  RecID: number;
  SharedPhoneNumber: boolean;
  SpeedDial: string;
  TypeID: string;
  Primary: boolean;
}