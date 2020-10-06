export interface RedtailContact {
  Age: number;
  Category: string;
  CategoryID: number;
  ClientID: number;
  ClientSince: string;
  ClientType: string;
  DateofBirth: string;
  DateofBirthReminder: boolean;
  FirstName: string;
  Gender: string;
  InputBy: string;
  InputByID: number;
  InputDate: string;
  LastName: string;
  MaritalDate: string;
  MaritalStatus: string;
  MiddleName: string;
  Name?: null;
  ReferredBy: string;
  ServicingAdvisor: string;
  ServicingAdvisorID: number;
  Source: string;
  SourceID: number;
  Status: string;
  StatusID: number;
  TaxID: string;
  WritingAdvisor: string;
  WritingAdvisorID: number;
}

export interface RedtailContactMaster {
  Address?: AddressEntity[] | null;
  ContactRecord: ContactRecord;
  Internet?: InternetEntity[] | null;
  Phone?: PhoneEntity[] | null;
}
export interface AddressEntity {
  Address1: string;
  Address2: string;
  City: string;
  ClientID: number;
  Label: string;
  LastUpdate: string;
  Preferred: boolean;
  Primary: boolean;
  RecAdd: string;
  RecAddUser: number;
  RecID: number;
  SharedAddress: boolean;
  State: string;
  Type: string;
  TypeID: string;
  Zip: string;
  Zip4?: null;
}
export interface ContactRecord {
  Age: number;
  AnniversaryDate: string;
  Category: string;
  CategoryID: number;
  ClientID: number;
  ClientSince: string;
  ClientSinceDate: string;
  ClientType: string;
  Company: string;
  CompanyID: number;
  DatabaseID: number;
  DateOfBirth: string;
  Deceased: string;
  Deleted: boolean;
  DeletedOn: string;
  Designation: string;
  Family: boolean;
  FamilyHeadID: number;
  Familyname: string;
  Firstname: string;
  Gender: string;
  InputBy?: null;
  InputByID: number;
  InputDate: string;
  JobTitle: string;
  LastUpdate: string;
  Lastname: string;
  MaritalDate: string;
  MaritalStatus: string;
  Middlename: string;
  Name: string;
  Nickname: string;
  ReferredBy: string;
  Relationship?: null;
  Salutation: string;
  ServicingAdvisor: string;
  ServicingAdvisorID: number;
  Source: string;
  SourceID: number;
  Status: string;
  StatusID: number;
  Suffix: string;
  TaxID: string;
  WritingAdvisor: string;
  WritingAdvisorID: number;
}
export interface InternetEntity {
  Address: string;
  ClientID: number;
  Label: string;
  LastUpdate: string;
  Preferred: boolean;
  Primary: boolean;
  Priority: boolean;
  RecAdd: string;
  RecAddUser: number;
  RecID: number;
  Type: string;
  TypeID: number;
}
export interface PhoneEntity {
  ClientID: number;
  DisplayOrder: number;
  Extension: string;
  Label: string;
  LastUpdate: string;
  Number: string;
  Number_Formatted: string;
  Preferred: boolean;
  Primary: boolean;
  RecAdd: string;
  RecAddUser: number;
  RecID: number;
  SharedPhoneNumber: boolean;
  SpeedDial: string;
  Type: string;
  TypeID: string;
}

export interface RedtailStatus {
  CSLCode: number;
  Code: string;
  DatabaseID: number;
  Deleted: boolean;
  LastUpdate: number;
}

export interface RedtailCategory {
  Code: string;
  DatabaseID: number;
  Deleted: boolean;
  MCCLCode: number;
}

export interface RedtailSource {
  Code: string;
  DatabaseID: number;
  Deleted: boolean;
  MCSLCode: number;
}

export interface RedtailSalutation {
  Code: string;
  Deleted: boolean;
  RecAdd: string;
  RecAddUser: number;
  SalutationCode: number;
}
export interface RedtailServicingAdvisor {
  Code: string;
  DatabaseID: number;
  Deleted: boolean;
  SALCode: number;
}

export interface RedtailWritingAdvisor {
  Code: string;
  DatabaseID: number;
  Deleted: boolean;
  WALCode: number;
}

export interface RedtailSettingsData {
  statuses: RedtailStatus[];
  categories: RedtailCategory[];
  sources: RedtailSource[];
  salutations: RedtailSalutation[];
  servicingAdvisors: RedtailServicingAdvisor[];
  writingAdvisors: RedtailWritingAdvisor[];
}
