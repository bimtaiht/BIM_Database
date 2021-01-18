import * as api from '../../../../../util/apiUtil'
import * as util from './SettingInputUtil'

export default class SettingInput {
  Name
  Description
  SettingType

  data
  get Data() {
    if (!this.data) {
      this.data = this.GetData();
    }
    return this.data;
  }
  set Data(v) {
    this.data = v;
  }

  GetData = () => {
    if (this.OnGetData) {
      return this.OnGetData();
    }
    return undefined;
  }

  editItem
  get EditItem(){
    return this.editItem;
  }
  set EditItem(v){
    this.editItem = v;
    if (!v){
      this.EditItemId = undefined;
    }
    else{
      this.EditItemId = v._id;
    }
  }


  EditItemId

  isNew = true;
  get IsNew(){
    return this.isNew;
  }
  set IsNew(v){
    this.isNew = v;
    if (v){
      this.EditItem = undefined;
    }
  }

  urlPrefix
  get UrlPrefix() {
    if (!this.urlPrefix){
      this.urlPrefix = util.GetUrlPrefix(this);
    }
    return this.urlPrefix;
  }

  AddDatabase = () => {
    var _id = this.EditItemId;
    var name = this.Name;
    var description = this.Description;
    var settingType = this.SettingType;
    var data = this.Data.ApiData;
    var prefix = this.UrlPrefix;

    var apiData = {
      _id, name, description, settingType, data
    }
    var url = `https://api.bimdev.vn/api/hbs/${prefix}`;

    const apiFunc = () => _id ?
      api.put(`${url}/edit`, apiData) : api.post(`${url}/add`, apiData);
    
    apiFunc().then(response => response.data)
      .then(data => {
        this.AddDatabaseDone = true;
        this.NewItem = this.GetEditItem(data, this.Dict);
        this.Dict.Update();
      })
  }

  set AddDatabaseDone(v) {
    if (this.OnAddDatabaseDone){
      this.OnAddDatabaseDone(v);
    }
  }
}