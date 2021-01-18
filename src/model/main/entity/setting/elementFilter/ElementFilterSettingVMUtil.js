import ElementFilterSettingVM from "./ElementFilterSettingVM"
import * as dataVMUtil from './ElementFilterSettingDataVMUtil'

export const get = (q, dict) => {
  var qI = new ElementFilterSettingVM();

  qI.ModelItem = q;
  qI.Dict = dict;

  q.OnNameChanged = (v) => {
    if (q.M2VM){
      qI.Name = v;
    }
  }

  q.OnDescriptionChanged = (v) => {
    if (q.M2VM){
      qI.Description = v;
    }
  }

  q.OnDataChanged = (v) => {
    if (q.M2VM){
      qI.Data = v;
      qI.DataVM = qI.GetDataVM();
    }
  }

  qI.OnGetDataVM = () => {
    var data = q.Data;
    return dataVMUtil.get(data);
  }    

  return qI;
}