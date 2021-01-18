import { makeObservable, observable, action } from 'mobx';
import * as util from './Phase_DictVMUtil'
import * as stateType from '../state/StateType'
import { message } from 'antd';

export class Phase_DictVM {
  constructor() {
    makeObservable(this, {
      items : observable,
      state : observable
    })
  }

  items= undefined
  get Items(){
    if (!this.items){
      this.items = util.GetItems(this);
    }
    return this.items;
  }

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

  state = undefined
  get State(){
    return this.state;
  }
  set State(v){
    this.state = v;
  }

  Add = (item) => {
    this.Items.push(item);
  }

  AddVersion = () => {
    this.State = stateType.addversion;
  }

  Cancel = () => {
    this.State = undefined;
  }

  OK = () => {
    var name = this.Input.Name;
    var index = this.Items.findIndex(x => x.Name === name);
    if (index !== -1){
      message.warning('version name already exists!');
      return;
    }

    this.State = undefined;
    this.ModelItem.AddMassVersion();
  }
}