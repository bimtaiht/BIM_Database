import * as util from './MES_ValueSettingUtil'

export default class MES_ValueSetting{
  get Index() {
    return this.Dict.ValueSettings.indexOf(this);
  }

  RetrieveType

  MassType
  
  ValueFiter

  workpackageId
  
  workpackage
  get Workpackage(){
    if (!this.workpackage){
      this.workpackage = util.GetWorkpackage(this);
    }
    return this.workpackage;
  }
  set Workpackage(v){
    this.workpackage = v;
    if (!v){
      this.workpackageId = undefined;
    }
    else{
      this.workpackageId = v._id;
    }
  }

  Delete = () => {
    this.Dict.ValueSettings.splice(this.Index, 1);
  }

  get ApiData() {
    return util.GetApiData(this);
  }
}