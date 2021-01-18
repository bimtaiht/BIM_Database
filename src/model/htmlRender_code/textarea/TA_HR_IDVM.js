import { makeObservable, observable, action } from 'mobx';
import HorResizeDictVM from '../../resizable/HorResizeDictVM';
import * as resizeItemUtil from '../../resizable/HorResizeItemVMUtil'
import * as textVMUtil from '../../text/TextVMUtil'
import TextAreaView from '../../textarea/TextAreaView';
import * as htmlRender_IODataVMUtil from '../HtmlRender_IODataVMUtil'
import HtmlRender_IODataView from '../HtmlRender_IODataView';
import * as floatItemVMUtil from '../../float/FloatItemVMUtil'
import { Button } from 'antd';
import FloatItemView from '../../float/FloatItemView';

export default class TA_HR_IDVM {
  constructor() {
    makeObservable(this, {

    })
  }

  htmlContent
  getHtmlContent = () => {
    if (!this.htmlContent) {
      this.htmlContent = `<p>{{INPUTVIEW,class,Tên kiểu dữ liệu}}</p>`;
    }
    return this.htmlContent;
  }
  setHtmlContent = (value) => {
    this.htmlContent = value;
  }

  textVM
  getTextVM = () => {
    if (!this.textVM) {
      var obj = this.textVM = textVMUtil.get(this.getHtmlContent());
      obj.onSetContent = (value) => this.setHtmlContent(value);

      // Wrapper
      var floatItemStore = floatItemVMUtil.get('top right');

      var setContent = () => {
        var htmlContent = this.getHtmlContent();
        console.log(htmlContent);

        //htmlContent = `<p>{{INPUTVIEW,class,Tên kiểu dữ liệu}}</p>`
        var htmlRender_IODataVM = this.getHtmlRender_IODataVM();
        //try {
          htmlRender_IODataVM.setHtmlContent(htmlContent);
          //renderReactElements
        //}
        //catch {
          //htmlRender_IODataVM.setHtmlContent('Invalid html');
        //}
      }

      floatItemStore.wrapper = <Button onClick={setContent}>Run</Button>
      obj.wrapper = <FloatItemView store={floatItemStore} />
    }
    return this.textVM;
  }

  htmlRender_IODataVM
  getHtmlRender_IODataVM = () => {
    if (!this.htmlRender_IODataVM) {
      this.htmlRender_IODataVM =
        htmlRender_IODataVMUtil.get(this.getHtmlContent(), true);
    }
    return this.htmlRender_IODataVM;
  }

  resizeDictVM;
  getResizeDictVM = () => {
    if (!this.resizeDictVM) {
      var dict = this.resizeDictVM = new HorResizeDictVM();

      var w1 = <TextAreaView store={this.getTextVM()} />
      var w2 = <HtmlRender_IODataView store={this.getHtmlRender_IODataVM()} />

      dict.items = [
        resizeItemUtil.get(w1, 25, 300, dict),
        resizeItemUtil.get(w2, 75, 300, dict)
      ]
    }
    return this.resizeDictVM;
  }
}