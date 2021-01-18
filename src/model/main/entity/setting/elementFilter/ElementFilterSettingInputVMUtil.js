import SettingInputVM from "../base/SettingInputVM";
import ElementFilterSettingInputVM from "./ElementFilterSettingInputVM"
import * as dataVMUtil from './ElementFilterSettingDataVMUtil'
import { message } from "antd";

export const get = (q, dict) => {
  var qI = new ElementFilterSettingInputVM();
  qI.ModelItem = q;
  qI.Dict = dict;

  q.OnAddDatabaseDone = (v) => {
    var command = qI.CommandName;
    message.success(`${command} element filter setting successfully`);
  }

  qI.OnGetDataVM = () => {
    var data = q.Data;
    return dataVMUtil.get(data);
  }

  return qI;
}