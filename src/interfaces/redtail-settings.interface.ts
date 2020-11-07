export interface RedtailList {
  id: number;
  name: string;
  is_default: boolean;
  deleted: boolean;
  created_at?: null;
  updated_at?: null;
}

export interface RedtailType {
  id: number | null;
  name: string | null;
}

export interface RedtailSettingsData {
  status_id: RedtailList[];
  category_id: RedtailList[];
  source_id: RedtailList[];
  salutations: RedtailList[];
  servicingAdvisors: RedtailList[];
  writingAdvisors: RedtailList[];
  genderTypes: RedtailType[];
  addressTypes: RedtailType[];
  emailTypes: RedtailType[];
  phoneTypes: RedtailType[];
  urlTypes: RedtailType[];
}

export interface StateAbbr {
  short: string;
  long: string;
}
