import { message } from "antd";
import { SettingVM } from "./SettingVM";

export const get = (q) => {
  var qI = new SettingVM();
  qI.Setting = q;

  q.OnDelete = () => {
    qI.Delete();
  }

  return qI;
}

export const GetCommandName = (qI) => {
  var isNew = qI.IsNew;
  return isNew ? "Create" : "Edit";
}