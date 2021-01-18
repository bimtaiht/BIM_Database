import { makeObservable, observable, action } from 'mobx';
import * as workpackageUtil from './WorkpackageUtil'
import * as util from './Workpackage_DictVMUtil'

export class Workpackage_DictVM {
  constructor() {
    makeObservable(this, {
      workpackageVMs: observable,
    })
  }

  OnGetItemsDone_Funcs = []

  set GetItemsDone (v){
    this.OnGetItemsDone_Funcs.forEach(x => x());
  }

  Workpackage_Dict

  get M2VM() {
    return this.Workpackage_Dict.M2VM;
  }
  set M2VM(v) {
    this.Workpackage_Dict.M2VM = v;
  }

  workpackageVMs = undefined
  get WorkpackageVMs() {
    if (!this.workpackageVMs){
      this.workpackageVMs = util.GetWorkpackageVMs(this);
    }
    return this.workpackageVMs;
  }

  currentWorkpackageVM
  set CurrentWorkpackageVM(v) {
    this.Workpackage_Dict = v;
    this.Workpackage_Dict.CurrentWorkpackage = v.Workpackage;

    this.WorkpackageInputVM.WorkpackageVM = v;
  }

  workpackageInputMV
  get WorkpackageInputVM() {
    if (!this.workpackageInputVM){
      this.workpackageInputVM = util.GetWorkpackageInputVM(this);
    }
    return this.workpackageInputVM;
  }

  Add = (itemView) => {
    this.WorkpackageVMs.push(itemView);
    if (this.OnAdd){
      this.OnAdd(itemView);
    }
  }
}