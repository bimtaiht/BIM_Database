import Setting from "../base/Setting";
import * as util from './MassGroupSettingDataUtil'
import { reaction } from "mobx";
import { PMData } from "../../../single/model/PMData";

export const pmData = () => {
  return PMData.Instance;
}

export default class MassGroupSettingData {
  fields
  get Fields(){
    if (!this.fields){
      this.fields = util.GetDefaultFields(this);
    }
    return this.fields;
  }
  set Fields(v){
    this.fields = v;
  }

  get ApiData() {
    return util.GetApiData(this);
  }

  AddNewField = () => {
    var item = pmData().MassPropertyNames[0];
    this.Fields.push(item);
    return item;
  }
}