import { PMDataVM } from "../../../../single/form/PMDataVM";
import MES_ValueSettingVM from "./MES_ValueSettingVM"

export const pmDataVM = () => {
  return PMDataVM.Instance;
}

export const get = (q, dict) => {
  var qI = new MES_ValueSettingVM();
  qI.ModelItem = q;
  qI.Dict = dict;

  pmDataVM().Workpackage_DictVM.OnGetItemsDone_Funcs.push((v) => {
    qI.WorkpackageVMStorageList = GetWorkpackageVMStorageList(qI);
  });

  return qI;
}

export const GetRetrieveTypeStorageList = (q) => {
  return pmDataVM().ValueRetrieveTypes;
}

export const GetWorkpackageVM = (q) => {
  var workpackage = q.ModelItem.Workpackage;
  if (!workpackage) return undefined;

  var list = pmDataVM().Workpackage_DictVM.WorkpackageVMs;
  if (!list) return undefined;

  var index = list.findIndex(x => x.Workpackage === workpackage);
  return index !== -1 ? list[index] : undefined;
}

export const GetWorkpackageVMStorageList = (q) => {
  return pmDataVM().Workpackage_DictVM.WorkpackageVMs;
}

export const GetMassTypeStorageList = (q) => {
  return pmDataVM().MassTypes;
}