import { MultiSelectVM } from "./MultiSelectVM";

export const get = (items, initialItems) => {
  var qI = new MultiSelectVM();
  qI.Items = items;
  qI.InitialItems = initialItems;
  return qI;
}