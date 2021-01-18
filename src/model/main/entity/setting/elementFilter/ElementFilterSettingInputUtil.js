import ElementFilterSettingInput from "./ElementFilterSettingInput";
import * as dataUtil from './ElementFilterSettingDataUtil'
import * as st from '../base/SettingType'

export const get = (dict) => {
  var qI = new ElementFilterSettingInput();
  qI.Dict = dict;
  qI.Name = 'Bộ lọc cột';
  qI.Description = 'mô tả bộ lọc';
  qI.SettingType = st.elementfilter;

  qI.OnGetData = () => {
    return dataUtil.getDefault();
  }

  return qI;
}