import * as api from '../../../../util/apiUtil'
import * as workpackageUtil from './WorkpackageUtil'

export class WorkpackageInput {
  Code
  // = "300"
  Name
  // = "Lắp đặt cốp thép"
  Description = 'mô tả công tác'
  // = "Mô tả quá trình lắp cốp thép"

  isNew = true;
  get IsNew(){
    return this.isNew;
  }
  set IsNew(v){
    this.isNew = v;
    if (v){
      this.Workpackage = undefined;
    }
  }

  workpackage
  get Workpackage() {
    return this.workpackage;
  }
  set Workpackage(v){
    this.workpackage = v;
    if (!v){
      this.WorkpackageId = undefined;
    }
    else{
      this.WorkpackageId = v._id;
    }
  }

  WorkpackageId

  supItem
  get SupItem(){
    return this.supItem;
  }
  set SupItem(v){
    this.supItem = v;
    if (!v){
      this.SupId = undefined;
    }
    else{
      this.SupId = v._id;
    }
  }

  SupId

  set AddDatabaseDone(v) {
    if (this.OnAddDatabaseDone){
      this.OnAddDatabaseDone(v);
    }
  }

  AddDatabase = () => {
    var _id = this.WorkpackageId;
    var code = this.Code;
    var name = this.Name;
    var description = this.Description;
    var supId = this.SupId;

    var apiData = {
      _id, name, code, description, supId
    };

    var url = "https://api.bimdev.vn/api/hbwp";

    const apiFunc =  () =>  _id ? 
      api.put(`${url}/edit`, apiData) : api.post(`${url}/add`, apiData);

    apiFunc().then(response => response.data)
      .then(data => {
        this.AddDatabaseDone = true;
        this.NewWorkpackage = workpackageUtil.get(data, this.Dict);
        this.Dict.Update();
      })
  }

  UpdateWorkpackage
}