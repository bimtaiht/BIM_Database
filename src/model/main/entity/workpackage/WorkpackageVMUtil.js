import { WorkpackageVM } from "./WorkpackageVM";
import { PMDataVM } from '../../single/form/PMDataVM'

export const pmDataVM = () => {
  return PMDataVM.Instance;
}

export const get = (q, dict) => {
  var qI = new WorkpackageVM();
  qI.Workpackage = q;
  qI.Dict = dict;

  q.OnCodeChanged = (v) => {
    if (q.M2VM){
      qI.Code = v;
    }
  }

  q.OnNameChanged = (v) => {
    if (q.M2VM){
      qI.Name = v;
    }
  }

  q.OnDescriptionChanged = (v) => {
    if (q.M2VM){
      qI.Description = v;
    }
  }

  q.OnFullNameChanged = (v) => {
    if (q.M2VM){
      qI.FullName = v;
    }
  }

  q.OnDelete = () => {
    qI.Delete();
  }

  return qI;
}

export const GetSupItem = (q) => {
  var supWp = q.Workpackage.SupItem;
  var list = pmDataVM().Workpackage_DictVM.WorkpackageVMs;
  var index = list.findIndex(x => x.Workpackage === supWp);
  return index !== -1 ? list[index] : undefined;
}