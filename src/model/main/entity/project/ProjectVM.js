import * as util from './ProjectVMUtil'

export default class ProjectVM {
  name
  get Name(){
    if(!this.name){
      this.name = this.ModelItem.Name;
    }
    return this.name;
  }
  set Name(v){
    this.name = v;
    this.ModelItem.Name = v;
  }

  code
  get Code(){
    if (!this.code){
      this.code = this.ModelItem.Code;
    }
    return this.code;
  }
  set Code(v){
    this.code = v;
    this.ModelItem.Code = v;
  }

  phase_DictVM
  get Phase_DictVM(){
    if (!this.phase_DictVM){
      this.phase_DictVM = util.GetPhase_DictVM(this);
    }
    return this.phase_DictVM;
  }

  get DisplayContent () {
    return `${this.Code} - ${this.Name}`;
  }
}