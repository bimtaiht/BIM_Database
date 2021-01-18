import Setting from "../base/Setting";
import SettingInput from "../base/SettingInput";
import * as massGroupSettingUtil from './MassGroupSettingUtil'

export default class MassGroupSettingInput extends SettingInput {
  GetEditItem = (data, dict) => {
    return massGroupSettingUtil.get(data, dict);
  }
}