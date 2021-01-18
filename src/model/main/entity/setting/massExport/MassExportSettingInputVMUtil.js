import SettingInputVM from "../base/SettingInputVM";
import * as dataVMUtil from './MassExportSettingDataVMUtil'
import { message } from "antd";
import MassExportSettingInputVM from "./MassExportSettingInputVM";

export const get = (q, dict) => {
  var qI = new MassExportSettingInputVM();
  qI.ModelItem = q;
  qI.Dict = dict;

  q.OnAddDatabaseDone = (v) => {
    var command = qI.CommandName;
    message.success(`${command} setting successfully`);
  }

  qI.OnGetDataVM = () => {
    var data = q.Data;
    return dataVMUtil.get(data);
  }

  return qI;
}