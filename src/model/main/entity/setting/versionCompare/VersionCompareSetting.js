import * as util from './VersionCompareSettingUtil'

export default class VersionCompareSetting{
  items
  get Items(){
    if (!this.items){
      this.items = util.GetItems();
    }
    return this.items;
  }
}