import * as phaseDictUtil from '../phase/Phase_DictUtil'

export default class Project {
  phase_Dict
  get Phase_Dict(){
    if (!this.phase_Dict){
      this.phase_Dict = phaseDictUtil.get(this);
    }
    return this.phase_Dict;
  }
}