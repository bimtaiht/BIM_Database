import { WorkpackageInput } from './WorkpackageInput';
import * as workpackageUtil from './WorkpackageUtil'
import * as genUtil from '../../../../util/generalUtil'

export class Workpackage_Dict {
  constructor() {
    workpackageUtil.getAll(this, (wps) => {
      this.Workpackages = wps;
      this.GetWorkpackagesDone = true;
    });
  }

  Workpackages

  set GetWorkpackagesDone(v) {
    if (this.OnGetWorkpackagesDone) {
      this.OnGetWorkpackagesDone(v);
    }
  }

  CurrentWorkpackage

  workpackageInput
  get WorkpackageInput() {
    if (!this.workpackageInput){
      var obj = this.workpackageInput = new WorkpackageInput();
      obj.Dict = this;
    }
    return this.workpackageInput;
  }

  Add = (item) => {
    this.Workpackages.push(item);
    if (this.OnAdd){
      this.OnAdd(item);
    }
  }

  Update = () => {
    var input = this.WorkpackageInput;
    var wp = input.Workpackage;

    if (!input.IsNew){
      var action = () => { 
        wp.Code = input.Code;
        wp.Name = input.Name;
        wp.Description = input.Description;
        wp.FullName = wp.GetFullName();
      };
      genUtil.UpdateFromModel(wp, action);
    }
    else{
      this.Add(input.NewWorkpackage);
    }

    this.IsDataChanged = true;
  }

  IsDataChanged

  RefreshData = () => {
    this.Workpackages.forEach(x => {
      x.SubItems = undefined;
      x.UpperList = undefined;
      x.LowerList = undefined;
      x.Rank = undefined
    })

    this.IsDataChanged = false;
  }
}