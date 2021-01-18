import { message } from 'antd'
import * as api from '../../../../../util/apiUtil'

export default class Setting{
  name
  get Name(){
    return this.name;
  }
  set Name(v){
    this.name = v;
    if (this.OnNameChanged){
      this.OnNameChanged(v);
    }
  }

  description
  get Description(){
    return this.description;
  }
  set Description(v){
    this.description = v;
    if (this.OnDescriptionChanged){
      this.OnDescriptionChanged(v);
    }
  }

  SettingType

  data
  get Data(){
    return this.data;
  }
  set Data(v){
    this.data = v;
    if (this.OnDataChanged){
      this.OnDataChanged(v);
    }
  }

  get Index() {
    return this.Dict.Items.indexOf(this);
  }

  Delete = () => {
    var {_id} = this;
    var apiData = {_id};

    var  url = "https://api.bimdev.vn/api/hbs/delete";
    api.put(url, apiData).then(response => response.data)
      .then(data => message.success('Delete setting successfully'))

    this.Dict.Items.splice(this.Index, 1);

    if (this.OnDelete){
      this.OnDelete();
    }

    this.Dict.Input.EditItemId = undefined;
  }
}