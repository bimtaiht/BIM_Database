import { SelectVM } from "./SelectVM";

export const get = (items, initialItem) => {
  var qI = new SelectVM();
  qI.Items = items;
  qI.InitialItem = initialItem;
  return qI;
}