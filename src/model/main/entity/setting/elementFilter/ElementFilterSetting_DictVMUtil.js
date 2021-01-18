import { ElementFilterSetting_DictVM } from "./ElementFilterSetting_DictVM";
import * as itemVMUtil from './ElementFilterSettingVMUtil'
import * as inputVMUtil from './ElementFilterSettingInputVMUtil'

export const get = (q) => {
  var qI = new ElementFilterSetting_DictVM();
  qI.ModelItem = q;

  q.OnGetItemsDone = (v) => {
    var obj = qI.Items;
    qI.GetItemsDone = true;
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