import { message } from "antd";
import { PMDataVM } from "../../../single/form/PMDataVM";
import MassResultCompVM from "./MassResultCompVM"

export const pmDataVM = () => {
  return PMDataVM.Instance;
}

export const get = (q, isfetchProjects = true) => {
  var qI = new MassResultCompVM();
  qI.ModelItem = q;

  if (isfetchProjects) {
    pmDataVM().Project_DictVM.OnGetItemsDone = (v) => {
      qI.ProjectVMStorageList = GetProjectVMStorageList(qI);
    }
  }

  pmDataVM().Workpackage_DictVM.OnGetItemsDone_Funcs.push((v) => {
    qI.WorkpackageVMStorageList = GetWorkpackageVMStorageList(qI);
  });

  q.OnGetItemsDone_Funcs.push(() => {
    message.success('get mass data successfully');
  })

  return qI;
}

export const GetProjectVMStorageList = (q) => {
  return pmDataVM().Project_DictVM.Items;
}

export const GetProjectVMs = (q) => {
  var storageList = q.ProjectVMStorageList;
  if (!storageList) return [];

  var list = [];

  var projects = q.Projects;
  projects.forEach(x => {
    var index = storageList.findIndex(y => y.ModelItem === x);
    if (index !== -1) {
      list.push(storageList[index]);
    }
  })

  return list;
}

export const GetWorkpackageVMStorageList = (q) => {
  return pmDataVM().Workpackage_DictVM.WorkpackageVMs;
}

export const GetWorkpackageVMs = (q) => {
  var storageList = q.WorkpackageVMStorageList;
  if (!storageList) return [];

  var list = [];

  var workpackages = q.Workpackages;
  workpackages.forEach(x => {
    var index = storageList.findIndex(y => y.Workpackage === x);
    if (index !== -1) {
      list.push(storageList[index]);
    }
  })

  return list;
}

export const GetPhaseVMs = (q) => {
  var storageList = q.PhaseVMStorageList;
  if (!storageList) return [];

  var list = [];

  var phases = q.Phases;
  phases.forEach(x => {
    var index = storageList.findIndex(y => y.ModelItem === x);
    if (index !== -1) {
      list.push(storageList[index]);
    }
  })

  return list;
}