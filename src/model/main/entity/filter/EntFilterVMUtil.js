import { SettingVM } from "../setting/base/SettingVM";
import { EntFilterVM } from "./EntFilterVM";

export const get = (q) => {
  if (!q) return undefined;
  var qI = new EntFilterVM();
  qI.ModelItem = q;
  return qI;
}