import * as api from '../../../../util/apiUtil'
import { PMData } from '../model/PMData';

import * as workpackage_DictVMUtil from '../../entity/workpackage/Workpackage_DictVMUtil'
import * as elementFilterSetting_DictVMUtil from 
  '../../entity/setting/elementFilter/ElementFilterSetting_DictVMUtil'
import * as massExportSetting_DictVMUtil from 
  '../../entity/setting/massExport/MassExportSetting_DictVMUtil'
import * as massGroupSetting_DictVMUtil from 
  '../../entity/setting/massGroup/MassGroupSetting_DictVMUtil'
import * as project_DictVMUtil from '../../entity/project/Project_DictVMUtil'

import * as massResultCompVMUtil from '../../entity/mass/result/MassResultCompVMUtil'

import * as fvt from '../../entity/filter/FilterValueType'
import * as sft from '../../entity/filter/StringFilterType'

export const pmData = () => PMData.Instance;

export const GetWorkpackage_DictVM = (data) => {
  return workpackage_DictVMUtil.get(pmData().Workpackage_Dict);
}

export const GetElementFilterSetting_DictVM = (data) => {
  return elementFilterSetting_DictVMUtil.get
    (pmData().ElementFilterSetting_Dict);
}

export const GetMassExportSetting_DictVM = (data) => {
  return massExportSetting_DictVMUtil.get
    (pmData().MassExportSetting_Dict);
}

export const GetMassGroupSetting_DictVM = (data) => {
  return massGroupSetting_DictVMUtil.get
    (pmData().MassGroupSetting_Dict);
}

export const GetProject_DictVM = (data) => {
  return project_DictVMUtil.get
    (pmData().Project_Dict);
}

export const GetMassResultCompVM= (data) => {
  return massResultCompVMUtil.get
  (pmData().MassResultComp);
}