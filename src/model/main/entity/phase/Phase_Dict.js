import { message } from 'antd';
import * as util from './Phase_DictUtil'
import * as api from '../../../../util/apiUtil'
import * as itemUtil from './PhaseUtil'

export class Phase_Dict {
  Items

  OnGetItemsDone_Funcs = []

  set GetItemsDone (v){
    this.OnGetItemsDone_Funcs.forEach(x => x());
  }

  input
  get Input(){
    if (!this.input){
      this.input = util.GetInput(this);
    }
    return this.input;
  }

  Add = (item) => {
    this.Items.push(item);
    if (this.OnAdd){
      this.OnAdd(item);
    }
  }
  
  AddMassVersion = () => {
    var apiData = this.Input.ApiData;
    var url = `https://api.bimdev.vn/api/hbphase`;

    const apiFunc = () => api.put(`${url}/mass/add`, apiData);
    
    apiFunc().then(response => response.data)
      .then(data => {
        var item = itemUtil.get(data, this);
        this.Add(item);
        message.success("create version successfully!");
      })
  }
}