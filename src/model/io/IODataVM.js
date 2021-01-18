import { makeObservable, observable, action } from 'mobx';
import * as inputUtil from '../../util/inputUtil'

export class IODataVM {
  constructor() {
    makeObservable(this, {
      inputs: observable,
      //outputs : observable
    })
  }

  inputs = undefined
  setInput = (name, value) => {
    inputUtil.get(this.inputs, name).value = value;
    
    if (this.onSetInput){
      this.onSetInput();
    }
  }

  outputs = undefined
  getOutputs = () => {
    this.outputs = this.getOutputFunc();
    return this.outputs;
  }
  getOutputFunc

  reactElements
  getReactElements = () => {
    if (!this.reactElements) {
      this.reactElements = this.getReactElementsFunc();
    }
    return this.reactElements;
  }

  getReactElementsFunc

  inputStyle

  style
  getStyle = () => {
    if (!this.style) {
      this.style = this.inputStyle ? this.inputStyle : {};

      if (this.wrapper) {
        this.style.position = 'relative';
      }
    }
    return this.style;
  }
}