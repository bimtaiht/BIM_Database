import * as itemUtil from './MassExportSettingUtil'
import * as inputUtil from './MassExportSettingInputUtil'
import * as genUtil from '../../../../../util/generalUtil'

export class MassExportSetting_Dict {
  constructor(){
    itemUtil.getAll(this, (items) => {
      this.Items = items;
      this.GetItemsDone = true;
    })
  }

  Items

  set GetItemsDone (v){
    if (this.OnGetItemsDone){
      this.OnGetItemsDone(v);
    }
  }

  CurrentItem

  input
  get Input(){
    if (!this.input){
      this.input = this.GetInput();
    }
    return this.input;
  }

  GetInput(){
    return inputUtil.get(this);
  }

  Add = (item) => {
    this.Items.push(item);
    if (this.OnAdd){
      this.OnAdd(item);
    }
  }

  Update = () => {
    var input = this.Input;

    if (!input.IsNew){
      var item = input.EditItem;
      var action = () => {
        item.Name = input.Name;
        item.Description = input.Description;
        item.Data = input.Data;
      }
      genUtil.UpdateFromModel(item, action);
    }
    else{
      this.Add(input.NewItem);
    }
  }
}