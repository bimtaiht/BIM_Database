import { makeObservable, observable, action } from 'mobx';

export class CheckboxVM {
  constructor() {
    makeObservable(this, {
      ischecked: observable,
      isDisable : observable
    })
  }

  name

  ischecked = undefined
  set Ischecked(v) {
    this.ischecked = v;
    if (this.onCheckChange) {
      this.onCheckChange(v);
    }
  }

  isDisable = false
}