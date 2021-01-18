import { message } from "antd";
import { PMDataVM } from "../../single/form/PMDataVM";
import { WorkpackageInputVM } from "./WorkpackageInputVM";

export const pmDataVM = () => {
  return PMDataVM.Instance;
}

export const get = (q, dict) => {
  var qI = new WorkpackageInputVM();
  qI.WorkpackageInput = q;
  qI.Dict = dict;

  pmDataVM().Workpackage_DictVM.OnGetItemsDone_Funcs.push(() => {
    qI.WorkpackageVMStorageList = GetWorkpackageVMStorageList(qI);
  })

  q.OnAddDatabaseDone = (v) => {
    var command = qI.CommandName;
    message.success(`${command} workpackage successfully`);
    //qI.clear();
  }

  dict.OnAdd = (v) => {
    qI.WorkpackageVM = v;
  }

  return qI;
}

export const GetCommandName = (qI) => {
  var isNew = qI.IsNew;
  return isNew ? "Create" : "Edit";
}

export const GetWorkpackageVMStorageList = (q) => {
  return pmDataVM().Workpackage_DictVM.WorkpackageVMs;
}