import * as api from '../../../../../util/apiUtil'
import * as dataUtil from './MassExportSettingDataUtil'
import MassExportSetting from './MassExportSetting';

export const get = (q, dict) => {
  var qI = new MassExportSetting();

  qI._id = q._id;
  qI.Name = q.name;
  qI.Description = q.description;
  qI.SettingType = q.settingType;
  qI.Data = dataUtil.get(q.data);
  qI.Dict = dict;

  return qI;
}

export const getAll = (dict, handle) => {
  var url = "https://api.bimdev.vn/api/hbs/me/list";
  api.get(url).then(response => response.data)
    .then(data => {
      var items = data.map(x => get(x, dict))
      if (handle) {
        handle(items);
      }
    });
}