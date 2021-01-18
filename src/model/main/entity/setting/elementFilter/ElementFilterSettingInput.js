import Setting from "../base/Setting";
import SettingInput from "../base/SettingInput";
import * as elementFilterSettingUtil from './ElementFilterSettingUtil'

export default class ElementFilterSettingInput extends SettingInput {
  GetEditItem = (data, dict) => {
    return elementFilterSettingUtil.get(data, dict);
  }
}