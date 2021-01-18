import SettingInputVM from "../base/SettingInputVM";
import * as dataVMUtil from './MassGroupSettingDataVMUtil'
import { message } from "antd";
import MassGroupSettingInputVM from "./MassGroupSettingInputVM";

export const get = (q, dict) => {
  var qI = new MassGroupSettingInputVM();
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