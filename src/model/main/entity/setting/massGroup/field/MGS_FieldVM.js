import * as util from './MGS_FieldVMUtil'
import * as selectVMUtil from '../../../../../select/SelectVMUtil'

export default class MGS_FieldVM {
  get Index() {
    return this.Dict.FieldVMs.indexOf(this);
  }

  get Fields(){
    return this.Dict.ModelItem.Fields;
  }

  get Field(){
    return this.Fields[this.Index];
  }
  set Field(v){
    this.Fields[this.Index] = v;
  }

  get FieldStorageList(){
    return util.GetFieldStorageList();
  }

  fieldSelectVM
  get FieldSelectVM(){
    if (!this.fieldSelectVM){
      var obj = this.fieldSelectVM = selectVMUtil.get(this.FieldStorageList, this.Field);
      obj.OnSelectedItemChanged = (v) => this.Field = v;
    }
    return this.fieldSelectVM;
  }

  Delete = () => {
    var index = this.Index;
    this.Fields.splice(index, 1);
    
    var list = this.Dict.FieldVMs;
    list.splice(index, 1);
  }

  SetData = (v) => {
    this.FieldSelectVM.InitialItem = v.Field;
  }
}