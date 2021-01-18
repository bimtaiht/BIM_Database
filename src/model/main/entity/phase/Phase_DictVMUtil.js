import * as itemVMUtil from './PhaseVMUtil'
import { Phase_DictVM } from "./Phase_DictVM";
import * as inputVMUtil from './PhaseInputVMUtil'

export const get = (q) => {
  var qI = new Phase_DictVM();
  qI.ModelItem = q;

  q.OnGetItemsDone_Funcs.push((v) => {
    var obj = qI.Items;
    qI.GetItemsDone = true;
  });

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

export const GetInput = (q) => {
  return inputVMUtil.get(q.ModelItem.Input, q);
}