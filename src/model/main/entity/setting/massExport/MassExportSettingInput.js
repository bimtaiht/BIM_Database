import Setting from "../base/Setting";
import SettingInput from "../base/SettingInput";
import * as massExportSettingUtil from './MassExportSettingUtil'

export default class MassExportSettingInput extends SettingInput {
  GetEditItem = (data, dict) => {
    return massExportSettingUtil.get(data, dict);
  }
}