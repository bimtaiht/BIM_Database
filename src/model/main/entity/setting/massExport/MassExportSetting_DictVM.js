import { makeObservable, observable, action } from 'mobx';
import * as util from './MassExportSetting_DictVMUtil'

export class MassExportSetting_DictVM {
  constructor() {
    makeObservable(this, {
      items : observable
    })
  }

  items= undefined
  get Items(){
    if (!this.items){
      this.items = util.GetItems(this);
    }
    return this.items;
  }

  currentItem
  get CurrentItem(){
    if (!this.currentItem){
      this.currentItem = this.ModelItem.CurrentItem;
    }
    return this.currentItem;
  }
  set CurrentItem(v){
    this.currentItem = v;
    if (!v){
      this.ModelItem.CurrentItem = v;
    }else{
      this.ModelItem.CurrentItem = v.ModelItem;
      this.Input.EditItem = v;
    }
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
  }
}