import { PMDataVM } from '../../../single/form/PMDataVM';
import MassExportSettingDataVM from './MassExportSettingDataVM';
import * as valueSettingVMUtil from './exportSetting/MES_ValueSettingVMUtil'

export const pmDataVM = () => {
  return PMDataVM.Instance;
}

export const get = (q) => {
  var qI = new MassExportSettingDataVM();
  qI.ModelItem = q;

  pmDataVM().ElementFilterSetting_DictVM.OnGetItemsDone = (v) => {
    qI.ElementFilterVMStorageList = GetElementFilterVMStorageList(qI);
  }

  return qI;
}

export const GetElementFilterVM = (q) => {
  var elemFilter = q.ModelItem.ElementFilter;
  if (!elemFilter) return undefined;

  var list = pmDataVM().ElementFilterSetting_DictVM.Items;
  if (!list) return undefined;

  var index = list.findIndex(x => x.ModelItem === elemFilter);
  return index !== -1 ? list[index] : undefined;
}

export const GetElementFilterVMStorageList = (q) => {
  return pmDataVM().ElementFilterSetting_DictVM.Items;
}

export const GetValueSettingVMs = (q) => {
  var valueSettings = q.ModelItem.ValueSettings;
  return valueSettings.map(x => valueSettingVMUtil.get(x, q));
}