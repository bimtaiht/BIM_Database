import MassResultComp from '../../mass/result/MassResultComp'
import * as massResutlCompVMUtil from '../../mass/result/MassResultCompVMUtil'

export const GetMassResultCompVM = (q) => {
  var obj = massResutlCompVMUtil.get(new MassResultComp(), false);
  obj.IsShowProjectSelect = false;
  obj.CanHavePhase = true;
  return obj;
}