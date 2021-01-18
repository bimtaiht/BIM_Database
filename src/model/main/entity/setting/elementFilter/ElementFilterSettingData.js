import Setting from "../base/Setting";
import * as util from './ElementFilterSettingDataUtil'

export default class ElementFilterSettingData {
  CategoryFilter

  IsHaveFamilyFilter

  FamilyFilter

  get ApiData() {
    return util.GetApiData(this);
  }
}