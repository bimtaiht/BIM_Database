import { CheckboxVM } from "./CheckboxVM"

export const get = (name, ischecked) => {
  var qI = new CheckboxVM();
  qI.ischecked = ischecked;
  qI.name = name;
  return qI;
}