import PhaseInputVM from "./PhaseInputVM";

export const get = (q, dict) => {
  var qI = new PhaseInputVM();
  qI.ModelItem = q;
  qI.Dict = dict;

  return qI;
}