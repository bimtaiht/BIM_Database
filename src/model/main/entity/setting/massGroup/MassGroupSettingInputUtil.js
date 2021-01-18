import * as dataUtil from './MassGroupSettingDataUtil'
import * as st from '../base/SettingType'
import MassGroupSettingInput from './MassGroupSettingInput';

export const get = (dict) => {
  var qI = new MassGroupSettingInput();
  qI.Dict = dict;
  qI.Name = 'Nhóm kl Kiến trúc';
  qI.Description = 'mô tả nhóm khối lượng';
  qI.SettingType = st.massgroup;

  qI.OnGetData = () => {
    return dataUtil.GetDefault();
  }

  return qI;
}