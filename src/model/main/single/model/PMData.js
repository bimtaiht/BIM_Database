import { makeObservable, observable, action } from 'mobx';
import MassResultComp from '../../entity/mass/result/MassResultComp';
import { Project_Dict } from '../../entity/project/Project_Dict';
import { ElementFilterSetting_Dict } from '../../entity/setting/elementFilter/ElementFilterSetting_Dict';
import { MassExportSetting_Dict } from '../../entity/setting/massExport/MassExportSetting_Dict';
import { MassGroupSetting_Dict } from '../../entity/setting/massGroup/MassGroupSetting_Dict';
import VersionCompareSetting from '../../entity/setting/versionCompare/VersionCompareSetting';
import { Workpackage_Dict } from '../../entity/workpackage/Workpackage_Dict';
import { CategoryData } from './CategoryData';
import * as util from './PMDataUtil'

export class PMData {
  constructor() {
    
  }

  static instance
  static get Instance(){
    if (!this.instance){
      this.instance = new PMData();
    }
    return this.instance;
  }

  get categoryData(){
    return CategoryData.Instance;
  }

  workpackage_Dict
  get Workpackage_Dict() {
    if (!this.workpackage_Dict){
      this.workpackage_Dict = new Workpackage_Dict();
    }
    return this.workpackage_Dict;
  }

  elementFilterSetting_Dict
  get ElementFilterSetting_Dict() {
    if (!this.elementFilterSetting_Dict){
      this.elementFilterSetting_Dict = new ElementFilterSetting_Dict();
    }
    return this.elementFilterSetting_Dict;
  }

  massExportSetting_Dict
  get MassExportSetting_Dict() {
    if (!this.massExportSetting_Dict){
      this.massExportSetting_Dict = new MassExportSetting_Dict();
    }
    return this.massExportSetting_Dict;
  }

  massGroupSetting_Dict
  get MassGroupSetting_Dict() {
    if (!this.massGroupSetting_Dict){
      this.massGroupSetting_Dict = new MassGroupSetting_Dict();
    }
    return this.massGroupSetting_Dict;
  }

  project_Dict
  get Project_Dict() {
    if (!this.project_Dict){
      this.project_Dict = new Project_Dict();
    }
    return this.project_Dict;
  }

  massResultComp
  get MassResultComp(){
    if (!this.massResultComp){
      this.massResultComp = new MassResultComp();
    }
    return this.massResultComp;
  }
  set MassResultComp(v){
    this.massResultComp = v;
  }

  filterValueTypes;
  get FilterValueTypes() {
    if (!this.filterValueTypes){
      this.filterValueTypes = util.GetFilterValueTypes();
    }
    return this.filterValueTypes;
  }

  stringFilterTypes;
  get StringFilterTypes() {
    if (!this.stringFilterTypes){
      this.stringFilterTypes = util.GetStringFilterTypes();
    }
    return this.stringFilterTypes;
  }

  valueRetrieveTypes
  get ValueRetrieveTypes() {
    if (!this.valueRetrieveTypes){
      this.valueRetrieveTypes = util.GetValueRetrieveTypes();
    }
    return this.valueRetrieveTypes;
  }

  categoryNames;
  get CategoryNames() {
    if (!this.categoryNames){
      this.categoryNames = this.categoryData.CategoryNames;
    }
    return this.categoryNames;
  }

  parameterNames;
  get ParameterNames(){
    if (!this.parameterNames){
      this.parameterNames = util.GetParameterNames();
    }
    return this.parameterNames;
  }

  massPropertyNames;
  get MassPropertyNames(){
    if (!this.massPropertyNames){
      this.massPropertyNames = util.GetMassPropertyNames();
    }
    return this.massPropertyNames;
  }

  massTypes;
  get MassTypes(){
    if (!this.massTypes){
      this.massTypes = util.GetMassTypes();
    }
    return this.massTypes;
  }

  versionCompareSetting
  get VersionCompareSetting(){
    if (!this.versionCompareSetting){
      this.versionCompareSetting = new VersionCompareSetting();
    }
    return this.versionCompareSetting;
  }
}