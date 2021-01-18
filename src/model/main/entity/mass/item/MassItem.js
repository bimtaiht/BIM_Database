import * as util from './MassItemUtil'
import * as mif from './MassItemField'

export default class MassItem {
  Value
  Unit

  projectId

  project
  get Project() {
    if (!this.project) {
      this.project = util.GetProject(this);
    }
    return this.project;
  }

  workpackageId

  workpackage
  get Workpackage() {
    if (!this.workpackage) {
      this.workpackage = util.GetWorkpackage(this);
    }
    return this.workpackage;
  }

  phases
  get Phases(){
    if (!this.phases){
      this.phases = util.GetPhases(this);
    }
    return this.phases;
  }

  get ValidPhasesByInput(){
    return util.GetValidPhasesByInput(this);
  }

  OnGetElementDone_Funcs = []

  set GetElementDone(v) {
    this.OnGetElementDone_Funcs.forEach(x => x());
  }

  GetValue = (field) => {
    var value = null;
    if (mif.GetDirectiveFields().includes(field)) {
      value = this[field];
    } else if (mif.GetIdentifyFields().includes(field)) {
      if (this.Element) {
        var elemInfo = this.Element.info;
        value = elemInfo.identify[field];
      }
    }
    else {
      value = this.Info[field];
    }

    return value;
  }
}