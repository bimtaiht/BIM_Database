import { makeObservable, observable, action } from 'mobx';
import * as util from './MassResultCompVMUtil'
import * as multiSelectVMUtil from '../../../../select/MultiSelectVMUtil'
import * as checkboxVMUtil from '../../../../checkbox/CheckboxVMUtil'

export default class MassResultCompVM {
  constructor() {
    makeObservable(this, {
      IsShowProjectSelect : observable,
      CanHavePhase : observable,
      isHavePhase : observable
    })
  }

  projects
  get Projects(){
    if (!this.projects){
      this.projects = this.ModelItem.Projects;
    }
    return this.projects;
  }
  set Projects(v){
    this.projects = v;
    this.ModelItem.Projects = v;
  }

  projectVMs
  get ProjectVMs(){
    if (!this.projectVMs){
      this.projectVMs = util.GetProjectVMs(this);
    }
    return this.projectVMs;
  }
  set ProjectVMs(v){
    this.projectVMs = v;
    this.Projects = v.map(x => x.ModelItem);
  }

  projectVMStorageList
  get ProjectVMStorageList() {
    if (!this.projectVMStorageList){
      this.projectVMStorageList = util.GetProjectVMStorageList(this);
    }
    return this.projectVMStorageList;
  }
  set ProjectVMStorageList(v){
    this.projectVMStorageList = v;
  
    this.projectVMs = util.GetProjectVMs(this);

    var selectVM = this.ProjectSelectVM;
    selectVM.Items = v;
    selectVM.InitialItems = this.projectVMs;
  }

  projectSelectVM
  get ProjectSelectVM(){
    if (!this.projectSelectVM){
      var list = this.ProjectVMStorageList ? this.ProjectVMStorageList : [];
      var obj = this.projectSelectVM = multiSelectVMUtil.get(list, this.ProjectVMs);
      obj.Placeholder = 'chọn dự án'
      obj.OnSelectedItemChanged = (v) => this.ProjectVMs = v;
    }
    return this.projectSelectVM;
  }

  IsShowProjectSelect = true

  // Workpackage Input
  workpackages
  get Workpackages(){
    if (!this.workpackages){
      this.workpackages = this.ModelItem.Workpackages;
    }
    return this.workpackages;
  }
  set Workpackages(v){
    this.workpackages = v;
    this.ModelItem.Workpackages = v;
  }

  workpackageVMs
  get WorkpackageVMs(){
    if (!this.workpackageVMs){
      this.workpackageVMs = util.GetWorkpackageVMs(this);
    }
    return this.workpackageVMs;
  }
  set WorkpackageVMs(v){
    this.workpackageVMs = v;
    this.Workpackages = v.map(x => x.Workpackage);
  }

  workpackageVMStorageList
  get WorkpackageVMStorageList() {
    if (!this.workpackageVMStorageList){
      this.workpackageVMStorageList = util.GetWorkpackageVMStorageList(this);
    }
    return this.workpackageVMStorageList;
  }
  set WorkpackageVMStorageList(v){
    this.workpackageVMStorageList = v;
  
    this.workpackageVMs = util.GetWorkpackageVMs(this);

    var selectVM = this.WorkpackageSelectVM;
    selectVM.Items = v;
    selectVM.InitialItems = this.workpackageVMs;
  }

  workpackageSelectVM
  get WorkpackageSelectVM(){
    if (!this.workpackageSelectVM){
      var list = this.WorkpackageVMStorageList ? this.WorkpackageVMStorageList : [];
      var obj = this.workpackageSelectVM = multiSelectVMUtil.get(list, this.WorkpackageVMs);
      obj.Placeholder = 'chọn công tác'
      obj.OnSelectedItemChanged = (v) => this.WorkpackageVMs = v;
    }
    return this.workpackageSelectVM;
  }

  phases
  get Phases(){
    if (!this.phases){
      this.phases = this.ModelItem.Phases;
    }
    return this.phases;
  }
  set Phases(v){
    this.phases = v;
    this.ModelItem.Phases = v;
  }

  phaseVMs
  get PhaseVMs(){
    if (!this.phaseVMs){
      this.phaseVMs = util.GetPhaseVMs(this);
    }
    return this.phaseVMs;
  }
  set PhaseVMs(v){
    this.phaseVMs = v;
    this.Phases = v.map(x => x.ModelItem);
  }

  massItem_Dict
  get MassItem_Dict(){
    if (!this.massItem_Dict){
      this.massItem_Dict = this.ModelItem.MassItem_Dict;
    }
    return this.massItem_Dict;
  }

  phaseVMStorageList
  get PhaseVMStorageList() {
    return this.phaseVMStorageList;
  }
  set PhaseVMStorageList(v){
    this.phaseVMStorageList = v;
  
    this.phaseVMs = util.GetPhaseVMs(this);

    var selectVM = this.PhaseSelectVM;
    selectVM.Items = v;
    selectVM.InitialItems = this.phaseVMs;
  }

  phaseSelectVM
  get PhaseSelectVM(){
    if (!this.phaseSelectVM){
      var list = this.PhaseVMStorageList ? this.PhaseVMStorageList : [];
      var obj = this.phaseSelectVM = multiSelectVMUtil.get(list, this.PhaseVMs);
      obj.Placeholder = 'chọn version'
      obj.OnSelectedItemChanged = (v) => this.PhaseVMs = v;
    }
    return this.phaseSelectVM;
  }

  CanHavePhase = false

  isHavePhase = undefined
  get IsHavePhase(){
    if (!this.isHavePhase){
      this.isHavePhase = this.ModelItem.IsHavePhase;
    }
    return this.isHavePhase;
  }
  set IsHavePhase(v){
    this.isHavePhase = v;
    this.ModelItem.IsHavePhase = v;
  }

  isShowPhaseSelectVM
  get IsShowPhaseSelectVM() {
    if (!this.isShowPhaseSelectVM) {
      var obj = this.isShowPhaseSelectVM
        = checkboxVMUtil.get("So sánh các version", this.IsHavePhase);

      obj.onCheckChange = (v) => {
        this.IsHavePhase = v;
      };
    }
    return this.isShowPhaseSelectVM;
  }

  // function
  GetMassData = () => {
    this.ModelItem.GetMassData();
  }
}