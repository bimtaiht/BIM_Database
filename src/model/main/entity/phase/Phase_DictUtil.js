import { Phase_Dict } from "./Phase_Dict";
import * as phaseUtil from './PhaseUtil'
import * as inputUtil from './PhaseInputUtil'

export const get = (project) => {
  var qI = new Phase_Dict();
  qI.Dict = project;

  phaseUtil.getByProject(project._id, (data) => {
    qI.Items = data.map(x => phaseUtil.get(x, qI));
    qI.GetItemsDone = true;
  })

  return qI;
}

export const GetInput = (q) => {
  return inputUtil.get(q);
}