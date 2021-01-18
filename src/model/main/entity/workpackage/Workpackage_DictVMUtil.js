import { Workpackage_DictVM } from "./Workpackage_DictVM";
import * as workpackageVMUtil from './WorkpackageVMUtil';
import * as workpackageInputVMUtil from './WorkpackageInputVMUtil';

export const get = (q) => {
  var qI = new Workpackage_DictVM();
  qI.Workpackage_Dict = q;

  q.OnGetWorkpackagesDone = (v) => {
    var obj = qI.WorkpackageVMs;
    qI.GetItemsDone = true;
  }

  q.OnAdd = (item) => {
    var itemView = workpackageVMUtil.get(item, qI);
    qI.Add(itemView);
  }

  return qI;
}

export const GetWorkpackageVMs = (dictVM) => {
  var wps = dictVM.Workpackage_Dict.Workpackages;
  if (!wps) return undefined;
  return wps.map(x => workpackageVMUtil.get(x, dictVM));
}

export const GetWorkpackageInputVM= (dictVM) => {
  var input = dictVM.Workpackage_Dict.WorkpackageInput;
  return workpackageInputVMUtil.get(input, dictVM);
}