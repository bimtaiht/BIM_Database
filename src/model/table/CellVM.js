import { makeObservable, observable, action } from 'mobx';

export default class CellVM {
  constructor() {
    makeObservable(this, {
      valueString : observable
    })
  }

  value
  get Value(){
    return this.value
  }
  set Value(v){
    this.value = v;
    this.ValueString = this.GetValueString();
  }

  valueString = undefined
  get ValueString (){
    if (!this.valueString){
      this.valueString = this.GetValueString();
    }
    return this.valueString;
  }
  set ValueString(v){
    this.valueString = v;
  }

  GetValueString = () => {
    return this.OnGetValueString();
  }
}