import FloatItemVM from "./FloatItemVM";

export const get = (loc) => {
  var qI = new FloatItemVM();
  qI.location = loc;
  return qI;
}