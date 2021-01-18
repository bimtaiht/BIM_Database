import * as itemVMUtil from './MassExportSettingVMUtil'
import * as inputVMUtil from './MassExportSettingInputVMUtil'
import { MassExportSetting_DictVM } from "./MassExportSetting_DictVM";

export const get = (q) => {
  var qI = new MassExportSetting_DictVM();
  qI.ModelItem = q;

  q.OnGetItemsDone = (v) => {
    var obj = qI.Items;
  }

  q.OnAdd = (v) => {
    qI.Add(itemVMUtil.get(v, qI));
  }

  return qI;
}

export const GetItems = (dictVM) => {
  var items = dictVM.ModelItem.Items;
  if (!items) return undefined;
  return items.map(x => itemVMUtil.get(x, dictVM));
}

export const GetInput = (dictVM) => {
  var input = dictVM.ModelItem.Input;
  return inputVMUtil.get(input, dictVM);
}