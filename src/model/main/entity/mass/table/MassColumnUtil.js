import MassColumn from "./MassColumn"

export const get = (q, dict) => {
  var qI = new MassColumn();
  qI.Name = q;
  qI.Dict = dict;
  return qI;
}