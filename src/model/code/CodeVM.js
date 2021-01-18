import { makeObservable, observable, action } from 'mobx';

import * as resizeItemUtil from '../resizable/HorResizeItemVMUtil'

import HorResizeDictVM from '../resizable/HorResizeDictVM';
import TextAreaView from '../textarea/TextAreaView';
import SyntaxHighlighterView, { Text } from '../syntax/SyntaxHighlighterView';
import { TextVM } from '../text/TextVM';

export default class CodeVM {
  constructor() {
    makeObservable(this, {
      content: observable
    })
  }

  code

  content = undefined;
  getContent = () => {
    if (!this.content) {
      this.content = this.code.content;
    }
    return this.content;
  }
  setContent = (value) => {
    this.content = value;
    this.getTextVM().content = value;
    this.code.content = value;
    this?.onSetContent(value);
  }

  textVM
  getTextVM = () =>{
    if (!this.textVM){
      this.textVM = new TextVM();
    }
    return this.textVM;
  }

  resizeDictVM;
  getResizeDictVM = () => {
    if (!this.resizeDictVM) {
      var dict = this.resizeDictVM = new HorResizeDictVM();

      var content = this.getContent();
      var textVM = this.getTextVM();

      var w1 = <TextAreaView store={textVM}
        onValueChange={q => this.setContent(q)} />
      textVM.content = content;
      var w2 = <SyntaxHighlighterView store={textVM} />

      dict.items = [
        resizeItemUtil.get(w1, 50, 300, dict),
        resizeItemUtil.get(w2, 50, 300, dict)
      ]
    }
    return this.resizeDictVM;
  }
}