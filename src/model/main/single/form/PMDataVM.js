import { makeObservable, observable, action } from 'mobx';
import { PMData } from '../model/PMData';
import * as util from './PMDataVMUtil'

export class PMDataVM {
  constructor() {
    
  }
  static instance
  static get Instance(){
    if (!this.instance){
      this.instance = new PMDataVM();
    }
    return this.instance;
  }

  get pmData(){
    return PMData.Instance;
  }

  workpackage_DictVM
  get Workpackage_DictVM() {
    if (!this.workpackage_DictVM){
      this.workpackage_DictVM = util.GetWorkpackage_DictVM();
    }
    return this.workpackage_DictVM;
  }

  elementFilterSetting_DictVM
  get ElementFilterSetting_DictVM() {
    if (!this.elementFilterSetting_DictVM){
      this.elementFilterSetting_DictVM = util.GetElementFilterSetting_DictVM();
    }
    return this.elementFilterSetting_DictVM;
  }

  massExportSetting_DictVM
  get MassExportSetting_DictVM() {
    if (!this.massExportSetting_DictVM){
      this.massExportSetting_DictVM = util.GetMassExportSetting_DictVM();
    }
    return this.massExportSetting_DictVM;
  }

  massGroupSetting_DictVM
  get MassGroupSetting_DictVM() {
    if (!this.massGroupSetting_DictVM){
      this.massGroupSetting_DictVM = util.GetMassGroupSetting_DictVM();
    }
    return this.massGroupSetting_DictVM;
  }

  project_DictVM
  get Project_DictVM() {
    if (!this.project_DictVM){
      this.project_DictVM = util.GetProject_DictVM();
    }
    return this.project_DictVM;
  }

  massResultCompVM
  get MassResultCompVM(){
    if (!this.massResultCompVM){
      this.massResultCompVM = util.GetMassResultCompVM();
    }
    return this.massResultCompVM;
  }
  set MassResultCompVM(v) {
    this.massResultCompVM = v;
    if (!v)
    {
      this.pmData.MassResultComp = v;
    }
    else{
      this.pmData.MassResultComp = v.ModelItem;
    }
  }

  filterValueTypes;
  get FilterValueTypes() {
    if (!this.filterValueTypes){
      this.filterValueTypes = this.pmData.FilterValueTypes;
    }
    return this.filterValueTypes;
  }

  stringFilterTypes;
  get StringFilterTypes() {
    if (!this.stringFilterTypes){
      this.stringFilterTypes = this.pmData.StringFilterTypes;
    }
    return this.stringFilterTypes;
  }

  categoryNames;
  get CategoryNames() {
    if (!this.categoryNames){
      this.categoryNames = this.pmData.CategoryNames;
    }
    return this.categoryNames;
  }

  valueRetrieveTypes
  get ValueRetrieveTypes() {
    if (!this.valueRetrieveTypes){
      this.valueRetrieveTypes = this.pmData.ValueRetrieveTypes
    }
    return this.valueRetrieveTypes;
  }

  parameterNames;
  get ParameterNames(){
    if (!this.parameterNames){
      this.parameterNames = this.pmData.ParameterNames;
    }
    return this.parameterNames;
  }

  massPropertyNames;
  get MassPropertyNames(){
    if (!this.massPropertyNames){
      this.massPropertyNames = this.pmData.MassPropertyNames;
    }
    return this.massPropertyNames;
  }

  massTypes;
  get MassTypes(){
    if (!this.massTypes){
      this.massTypes = this.pmData.MassTypes;
    }
    return this.massTypes;
  }
}