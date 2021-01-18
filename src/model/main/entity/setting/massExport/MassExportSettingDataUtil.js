import { PMData } from '../../../single/model/PMData';
import MassExportSettingData from './MassExportSettingData';
import * as valueSettingUtil from './exportSetting/MES_ValueSettingUtil'

export const pmData = ()  =>{
  return PMData.Instance;
}

export const get = (q) => {
  var qI = new MassExportSettingData();
  qI.elementFilterId = q.elementFilterId;
  qI.ValueSettings = q.exportSettings.map(x => valueSettingUtil.get(x, qI));
  return qI;
}

export const GetDefault = () => {
  var qI = new MassExportSettingData();
  return qI;
}

export const GetElementFilter = (q) => {
  var elemFilterId = q.elementFilterId;
  if (!elemFilterId) return undefined;

  var list = pmData().ElementFilterSetting_Dict.Items;
  if (!list) return undefined;

  var index = list.findIndex(x => x._id === elemFilterId);
  return index !== -1 ? list[index] : undefined;
}

export const GetDefaultValueSettings = (q) => {
  return [ valueSettingUtil.GetDefault(q) ]
}

export const GetApiData = (q) => {
  return {
    elementFilterId : q.elementFilterId,
    exportSettings : q.ValueSettings.map(x => x.ApiData)
  }
}