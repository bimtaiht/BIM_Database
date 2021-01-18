import { InputVM } from "./InputVM"

export const get = (name, initValue) => {
  var qI = new InputVM();
  qI.name = name;
  qI.value = initValue;
  return qI;
}