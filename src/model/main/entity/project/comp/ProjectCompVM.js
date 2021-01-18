import { makeObservable, observable, action } from 'mobx';
import { PMDataVM } from '../../../single/form/PMDataVM';
import { PMData } from '../../../single/model/PMData';
import * as projectUtil from '../ProjectUtil'
import * as projectVMUtil from '../ProjectVMUtil'
import * as util from './ProjectCompVMUtil'

export const pmDataVM = () => {
  return PMDataVM.Instance;
}

export const pmData = () => {
  return PMData.Instance;
}


export default class ProjectCompVM {
  constructor() {
    makeObservable(this, {
      projectVM: observable
    })
  }

  _id
  get id() {
    return this._id;
  }
  set id(v) {
    this._id = v;
    projectUtil.getById(v, (item) => {
      this.ProjectVM = projectVMUtil.get(item);
    })
  }

  projectVM = undefined
  get ProjectVM() {
    return this.projectVM;
  }
  set ProjectVM(v) {
    this.projectVM = v;

    var list = [v];
    pmDataVM().Project_DictVM.Items = list;
    pmData().Phase_Dict = v.ModelItem.Phase_Dict;

    var massResComp = this.MassResultCompVM;
    massResComp.ProjectVMStorageList = list;
    massResComp.ProjectSelectVM.InitialItems = list;

    var setItemsFuncs = () => massResComp.PhaseVMStorageList = phase_DictVM.Items;

    var phase_DictVM = v.Phase_DictVM;
    if (phase_DictVM.Items) {
      setItemsFuncs();
    } else {
      phase_DictVM.OnGetItemsDone_Funcs.push(() => {
        setItemsFuncs();
      })
    }
  }

  massResultCompVM
  get MassResultCompVM() {
    if (!this.massResultCompVM) {
      var obj = this.massResultCompVM = util.GetMassResultCompVM(this);
      pmDataVM().MassResultCompVM = obj;
    }
    return this.massResultCompVM;
  }
}