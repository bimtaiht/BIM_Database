import * as dataUtil from './MassExportSettingDataUtil'
import MassExportSettingInput from "./MassExportSettingInput";
import * as st from '../base/SettingType'

export const get = (dict) => {
  var qI = new MassExportSettingInput();
  qI.Dict = dict;
  qI.Name = 'Bêtông sàn';
  qI.Description = 'mô tả thiết lập';
  qI.SettingType = st.massexport;

  qI.OnGetData = () => {
    return dataUtil.GetDefault();
  }

  return qI;
}