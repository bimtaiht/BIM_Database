import { PMDataVM } from "../../../../single/form/PMDataVM";
import MGS_FieldVM from "./MGS_FieldVM"

export const pmDataVM = () => {
  return PMDataVM.Instance;
}

export const get = (q, dict) => {
  var qI = new MGS_FieldVM();
  qI.Dict = dict;
  return qI;
}

export const GetFieldStorageList = () => {
  return pmDataVM().MassPropertyNames;
}