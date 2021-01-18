import { makeObservable, observable, action } from 'mobx';

export default class HorResizeDictVM {
  constructor() {
    makeObservable(this, {
      items: observable
    })
  }

  items = []
}