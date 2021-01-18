import MES_ValueSetting from './MES_ValueSetting'
import * as filterUtil from '../../../filter/EntFilterUtil'
import * as vrt from './MES_ValueRetrieveType'
import * as fvt from '../../../filter/FilterValueType'
import * as sft from '../../../filter/StringFilterType'
import * as fct from '../../../filter/FilterCategoryType'
import { EntFilter } from '../../../filter/EntFilter';
import { PMData } from '../../../../single/model/PMData'

export const pmData = ()  =>{
  return PMData.Instance;
}

export const get = (q, dict) => {
  var qI = new MES_ValueSetting();
  qI.RetrieveType = q.retrieveType;
  qI.MassType = q.massType;
  qI.ValueFilter = filterUtil.get(q.valueFilter, fct.parameter);
  qI.workpackageId = q.workpackageId;
  qI.Dict = dict;
  return qI;
}

export const Clone = (q, dict) => {
  var qI = new MES_ValueSetting();
  qI.RetrieveType = q.RetrieveType;
  qI.MassType = q.MassType;
  qI.ValueFilter = q.ValueFilter;
  qI.Workpackage = q.Workpackage;
  qI.Dict = dict;
  return qI;
}

export const GetDefault = (dict) => {
  var qI = new MES_ValueSetting();
  qI.RetrieveType = vrt.byparameter;
  qI.Dict = dict;
  
  var valueFilter = new EntFilter();
  valueFilter.CategoryType = fct.parameter;
  valueFilter.ValueType = fvt.bystring;
  valueFilter.StringFilterType = sft.byequal;
  valueFilter.Values = [ 'Volume' ];

  qI.ValueFilter = valueFilter;

  return qI;
}

export const GetWorkpackage = (q) => {
  var workpackageId = q.workpackageId;
  if (!workpackageId) return undefined;

  var list = pmData().Workpackage_Dict.Workpackages;
  if (!list) return undefined;

  var index = list.findIndex(x => x._id === workpackageId);
  return index !== -1 ? list[index] : undefined;
}

export const GetApiData = (q) => {
  return {
    retrieveType : q.RetrieveType,
    massType : q.MassType,
    valueFilter: q.ValueFilter.ApiData,
    workpackageId : q.workpackageId
  }
}