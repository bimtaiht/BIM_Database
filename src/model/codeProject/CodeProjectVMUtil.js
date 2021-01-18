import CodeProjectVM from "./CodeProjectVM"

export const get = (q) => {
  var qI = new CodeProjectVM();
  qI.codeProject = q;
  return qI;
}