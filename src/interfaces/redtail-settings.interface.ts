export interface RedtailList {
  id: number;
  name: string;
  is_default: boolean;
  deleted: boolean;
  created_at?: null;
  updated_at?: null;
}

export interface RedtailGender {
  id: string;
  name: string;
}

export interface RedtailAddressTypes {
  Description: string;
  TypeID: string;
}

export interface RedtailInternetTypes {
  Description: string;
  TypeID: number;
}

export interface RedtailPhoneTypes {
  Description: string;
  TypeID: string;
}

export interface RedtailSettingsData {
  status_id: RedtailList[];
  category_id: RedtailList[];
  source_id: RedtailList[];
  salutations: RedtailList[];
  servicingAdvisors: RedtailList[];
  writingAdvisors: RedtailList[];
  gender: RedtailGender[];
  addressTypes: RedtailAddressTypes[];
  internetTypes: RedtailInternetTypes[];
  phoneTypes: RedtailPhoneTypes[];
}
