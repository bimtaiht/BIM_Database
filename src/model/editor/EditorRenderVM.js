import { makeObservable, observable, action } from 'mobx';
import HtmlRenderView from '../html/HtmlRenderView';
import EditorView from './EditorView';

import HorResizeDictVM from '../resizable/HorResizeDictVM';
import * as resizeItemUtil from '../resizable/HorResizeItemVMUtil'
import * as textVMUtil from '../text/TextVMUtil'
import * as htmlRenderVMUtil from '../html/HtmlRenderVMUtil'
import * as htmlUtil from '../../util/htmlUtil'
import TextView from '../text/TextView';
import FloatItemView from '../float/FloatItemView';
import * as floatItemVMUtil from '../float/FloatItemVMUtil'
import { Button, message } from 'antd';
import * as commandUtil from '../../util/commandUtil'

export default class EditorRenderVM {
  constructor() {
    makeObservable(this, {
      content: observable
    })
  }

  editorRender

  content = undefined
  getContent = () => {
    if (!this.content) {
      this.editorRender.content = `{{INPUTVIEW,0}}`

      this.content = this.editorRender.getContent();
    }
    return this.content;
  }
  setContent = (value) => {
    this.content = value;

    this.getTextVMforTextView().content = value;
    this.getTextVMforHtmlRenderView().setContent(value);

    this.editorRender.content = value;
  }

  textVM
  getTextVM = () => {
    if (!this.textVM) {
      var content = this.getContent();
      var obj = this.textVM = textVMUtil.get(content);

      obj.onSetContent = x => {
        this.setContent(x);
      }
    }
    return this.textVM;
  }

  textVMforHtmlRenderView
  getTextVMforHtmlRenderView = () => {
    if (!this.textVMforHtmlRenderView) {
      var content = this.getContent();
      var obj = this.textVMforHtmlRenderView = 
        htmlRenderVMUtil.get(content, true);

      var ip1 = { name:'x', value: 10 }

      var inputs = obj.inputs = [ip1];
    }
    return this.textVMforHtmlRenderView;
  }

  textVMforTextView
  getTextVMforTextView = () => {
    if (!this.textVMforTextView) {
      var content = this.getContent();
      var obj = this.textVMforTextView = textVMUtil.get(content);

      var floatItemStore = floatItemVMUtil.get('top right');

      var copyCommand = () => {
        commandUtil.copyToClipboard(obj.content);
        message.success('Copy to clipboard');
      }
      floatItemStore.wrapper = <Button onClick={copyCommand}>Copy</Button>

      obj.wrapper = <FloatItemView store={floatItemStore} />
    }
    return this.textVMforTextView;
  }

  resizeDictVM;
  getResizeDictVM = () => {
    if (!this.resizeDictVM) {
      var dict = this.resizeDictVM = new HorResizeDictVM();

      var textVM = this.getTextVM();
      var textVMforHtmlRenderView = this.getTextVMforHtmlRenderView();
      var textVMforTextView = this.getTextVMforTextView();

      var w1 = <EditorView store={textVM} />
      var w2 = <HtmlRenderView store={textVMforHtmlRenderView} />
      var w3 = <TextView store={textVMforTextView} />

      dict.items = [
        resizeItemUtil.get(w1, 35, 300, dict),
        resizeItemUtil.get(w2, 35, 300, dict),
        resizeItemUtil.get(w3, 30, 300, dict)
      ]
    }
    return this.resizeDictVM;
  }
}