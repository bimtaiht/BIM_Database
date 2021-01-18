
import { makeObservable, observable, action } from 'mobx';
import * as htmlRenderVMUtil from '../html/HtmlRenderVMUtil'
import HtmlRenderView from '../html/HtmlRenderView'
import * as floatItemVMUtil from '../float/FloatItemVMUtil'
import { Button } from 'antd';
import FloatItemView from '../float/FloatItemView';

export class SliderVM {
  constructor() {
    makeObservable(this, {
      htmlContents: observable,
    })
  }

  htmlContents = undefined
  getHtmlContents = () => {
    if (!this.htmlContents) {
      this.htmlContents = [
       ``
      ]
    }
    return this.htmlContents;
  }
  setHtmlContents = (value) => {
    this.htmlContents = value;
    this.setCurrentIndex(0);
  }

  htmlRenderVMs
  getHtmlRenderVMs = () => {
    if (!this.htmlRenderVMs) {
      this.htmlRenderVMs =
        this.getHtmlContents().map(x => {
          return htmlRenderVMUtil.get(x, true);
        })
    }
    return this.htmlRenderVMs;
  }

  isLoop = true;

  currentIndex = 0
  setCurrentIndex = (value) => {
    var isLoop = this.isLoop;
    var lastIndex =this.htmlContents.length -1; 
    if (value < 0){ 
      if (!isLoop) return;
      value = lastIndex;
    }
    else if (value > lastIndex){
      if (!isLoop) return;
      value = 0;
    }
    this.currentIndex = value;
    this.getHtmlRenderVM().setContent(this.getCurrentContent());
  }

  getCurrentContent = () => {
    var content = this.getHtmlContents()[this.currentIndex];
    return content;
  }

  htmlRenderVM
  getHtmlRenderVM = () => {
    if (!this.htmlRenderVM){
      var content = this.getCurrentContent();
      this.htmlRenderVM = htmlRenderVMUtil.get(content, true);
    }
    return this.htmlRenderVM;
  }

  htmlRenderView
  getHtmlRenderView = () => {
    if (!this.htmlRenderView){
      this.htmlRenderView = 
        <HtmlRenderView store={this.getHtmlRenderVM()} />
    }
    return this.htmlRenderView;
  }

  wrapper
  getWrapper = () => {
    if (!this.wrapper) {
      var floatItemStore1 = floatItemVMUtil.get('top left');
      var last = () =>  {
        this.setCurrentIndex(this.currentIndex-1);
      }
      floatItemStore1.wrapper = 
        <Button onClick={last}>{`<`}</Button>

      var floatItemStore2 = floatItemVMUtil.get('top right');
      var next = () =>  {
        this.setCurrentIndex(this.currentIndex+1);
      }
      floatItemStore2.wrapper = 
        <Button onClick={next}>{`>`}</Button>

      this.wrapper = <>
        <FloatItemView store={floatItemStore1} />
        <FloatItemView store={floatItemStore2} />
      </>
    }
    return this.wrapper;
  }
}