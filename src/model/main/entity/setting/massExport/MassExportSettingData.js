import Setting from "../base/Setting";
import * as util from './MassExportSettingDataUtil'
import * as valueSettingUtil from './exportSetting/MES_ValueSettingUtil'
import { reaction } from "mobx";

export default class MassExportSettingData {
  elementFilterId

  elementFilter
  get ElementFilter(){
    if (!this.elementFilter){
      this.elementFilter = util.GetElementFilter(this);
    }
    return this.elementFilter;
  }
  set ElementFilter(v) {
    this.elementFilter = v;
    if (!v){
      this.elementFilterId = undefined;
    }
    else{
      this.elementFilterId = v._id;
    }
  }

  valueSettings
  get ValueSettings(){
    if (!this.valueSettings){
      this.valueSettings = util.GetDefaultValueSettings(this);
    }
    return this.valueSettings;
  }
  set ValueSettings(v){
    this.valueSettings = v;
  }

  AddNewValueSetting = () => {
    var modelList = this.ValueSettings;
    var item = valueSettingUtil.GetDefault(this);
    modelList.push(item);

    return item;
  }

  get ApiData() {
    return util.GetApiData(this);
  }
}