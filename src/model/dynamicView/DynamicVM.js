import { makeObservable, observable, action } from 'mobx';

export default class DynamicVM {
  constructor() {
    makeObservable(this, {
      currentViewType: observable
    })
  }

  currentViewType = undefined

  inputs
  getInputs = () => {
    if (!this.inputs){
      this.inputs = []
    }
    return this.inputs
  }
}