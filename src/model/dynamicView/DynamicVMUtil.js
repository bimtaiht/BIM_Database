import DynamicVM from "./DynamicVM"

export const get = (q) => {
  var qI = new DynamicVM();
  qI.currentViewType = q;
  return qI;
}