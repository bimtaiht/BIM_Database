import * as phaseDictVMUtil from '../phase/Phase_DictVMUtil'
import ProjectVM from "./ProjectVM";

export const get = (q, dict) => {
  if (!q) return undefined;
  var qI = new ProjectVM();

  qI.ModelItem = q;
  qI.Dict = dict;  

  return qI;
}

export const GetPhase_DictVM = (q) => {
  var phaseDict = q.ModelItem.Phase_Dict;
  return phaseDictVMUtil.get(phaseDict);
}