import { makeObservable, observable, action } from 'mobx';

export class TextVM {
  constructor() {
    makeObservable(this, {
      content: observable,
      placeholder : observable
    })
  }

  content = undefined
  get Content(){
    return this.content;
  }
  set Content(v) {
    this.content = v;
    if (this.onSetContent) {
      this.onSetContent(v);
    }
  }

  placeholder = "nội dung input"
  set Placeholder(v) {
    this.placeholder = v;
  }

  inputStyle

  style
  get Style() {
    if (!this.style) {
      this.style = this.inputStyle ? this.inputStyle : {};

      if (this.wrapper) {
        this.style.position = 'relative';
      }
    }
    return this.style;
  }
}