import { makeObservable, observable, action } from 'mobx';

export class InputVM {
  constructor() {
    makeObservable(this, {
      value: observable,
    })
  }

  name
  value = undefined
}