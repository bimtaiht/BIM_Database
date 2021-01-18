import { makeObservable, observable, action } from 'mobx';
import * as util from './ElementFilterSetting_DictVMUtil'

export class ElementFilterSetting_DictVM {
  constructor() {
    makeObservable(this, {
      items : observable
    })
  }

  get M2VM() {
    return this.ModelItem.M2VM;
  }
  set M2VM(v) {
    this.ModelItem.M2VM = v;
  }

  set GetItemsDone (v){
    if (this.OnGetItemsDone){
      this.OnGetItemsDone(v);
    }
  }

  items  = undefined
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