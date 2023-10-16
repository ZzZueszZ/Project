export type Setting = {
  code: string;
  name?: string;
  type?: string;
  value: string;
  description?: string;
  required?: boolean;
  options?: string;
};

export type Settings = {
  settingInfos: Setting[];
};
export type SettingGroup = {
  code?: string;
  name?: string;
  displayOrder?: number;
};
