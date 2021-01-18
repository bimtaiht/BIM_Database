import PhaseVM from "./PhaseVM";

export const get = (q, dict) => {
  if (!q) return undefined;
  var qI = new PhaseVM();

  qI.ModelItem = q;
  qI.Dict = dict;  

  return qI;
}