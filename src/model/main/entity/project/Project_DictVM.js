import { makeObservable, observable, action } from 'mobx';
import * as util from './Project_DictVMUtil'

export class Project_DictVM {
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
  set Items(v){
    this.items = v;
    this.ModelItem.Items = v.map(x => x.ModelItem);
  }

  set GetItemsDone (v){
    if (this.OnGetItemsDone){
      this.OnGetItemsDone(v);
    }
  }
}