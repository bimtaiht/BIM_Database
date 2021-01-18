import { Button } from 'antd';
import { makeObservable, observable, action } from 'mobx';
import FloatItemView from '../float/FloatItemView';
import HtmlRenderView from '../html/HtmlRenderView';
import * as htmlRenderVMUtil from '../html/HtmlRenderVMUtil'
import IODataView from '../io/IODataView';
import * as ioDataVMUtil from '../io/IODataVMUtil'
import HorResizeDictVM from '../resizable/HorResizeDictVM';
import * as resizeItemUtil from '../resizable/HorResizeItemVMUtil'
import * as floatItemVMUtil from '../float/FloatItemVMUtil'

export default class HtmlRender_IODataVM {
  constructor() {
    makeObservable(this, {

    })
  }

  htmlContent
  getHtmlContent = () => {
    if (!this.htmlContent) {
      this.htmlContent = `<p>{{INPUTVIEW,class,Tên kiểu dữ liệu}}</p><p>{{INPUTVIEW,classDesc,Mô tả}}</p>`;
    }
    return this.htmlContent;
  }
  setHtmlContent = (value) => {
    this.htmlContent = value;
    var htmlRenderVM = this.getHtmlRenderVM();
    htmlRenderVM.setContent(value);
  }

  htmlRenderVM;
  getHtmlRenderVM = () => {
    if (!this.htmlRenderVM) {
      var content = this.getHtmlContent();
      var obj = this.htmlRenderVM =
        htmlRenderVMUtil.get(content, true);

      obj.onSetInput = (input) => {
        var ioDataVM = this.getIODataVM();
        var { name, value } = input;
        ioDataVM.setInput(name, value);
      }

      // Manual Render
      if (this.manualRender) {
        var floatItemStore = floatItemVMUtil.get('top right');
        floatItemStore.wrapper = <Button onClick={obj.renderReactElements}>Render</Button>
        obj.wrapper = <FloatItemView store={floatItemStore} />
      }
    }
    return this.htmlRenderVM;
  }

  ioDataVM;
  getIODataVM = () => {
    if (!this.ioDataVM) {
      var { inputs } = this.getHtmlRenderVM();
      this.ioDataVM = ioDataVMUtil.getClassDefinition(inputs);
    }
    return this.ioDataVM;
  }

  resizeDictVM;
  getResizeDictVM = () => {
    if (!this.resizeDictVM) {
      var dict = this.resizeDictVM = new HorResizeDictVM();

      var w1 = <HtmlRenderView store={this.getHtmlRenderVM()} />
      var w2 = <IODataView store={this.getIODataVM()} />

      dict.items = [
        resizeItemUtil.get(w1, 50, 300, dict),
        resizeItemUtil.get(w2, 50, 300, dict)
      ]
    }
    return this.resizeDictVM;
  }
}