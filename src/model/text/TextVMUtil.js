import { TextVM } from "./TextVM"

export const get = (q, placeholder) => {
  var qI = new TextVM();
  qI.content = q;
  qI.placeholder = placeholder;
  return qI;
}