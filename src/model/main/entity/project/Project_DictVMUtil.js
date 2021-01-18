import * as itemVMUtil from './ProjectVMUtil'
import { Project_DictVM } from "./Project_DictVM";

export const get = (q) => {
  var qI = new Project_DictVM();
  qI.ModelItem = q;

  q.OnGetItemsDone = (v) => {
    var obj = qI.Items;
    qI.GetItemsDone = true;
  }

  return qI;
}

export const GetItems = (dictVM) => {
  var items = dictVM.ModelItem.Items;
  if (!items) return undefined;
  return items.map(x => itemVMUtil.get(x, dictVM));
}