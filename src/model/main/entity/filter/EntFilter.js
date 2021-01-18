import * as util from './EntFilterUtil'

export class EntFilter
{
  ValueType
  NumberFilterType
  StringFilterType
  IsEqualLeft
  IsEqualRight

  values
  get Values(){
    return this.values;
  }
  set Values(v){
    this.values = v;
  }

  CategoryType

  valueStorageList
  get ValueStorageList(){
    if (!this.valueStorageList){
      this.valueStorageList = util.GetValueStorageList(this);
    }
    return this.valueStorageList;
  }

  get ApiData() {
    return util.GetApiData(this);
  }
}