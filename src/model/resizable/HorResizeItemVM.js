import { makeObservable, observable, action } from 'mobx';

export default class HorResizeItemVM {
  //constructor(wp, h, dict) {
  constructor() {

    makeObservable(this, {
      widthPercent : observable,
      //wrapper : observable
    })
  }

  widthPercent = 30
  height

  getEnable = () => {
    var index = this.getIndex();
    return index !== this.dict.items.length -1 ? 
      { right: true} : '';
  }

  getIndex = () =>{
    return this.dict.items.indexOf(this);
  }

  offsetWidthPercent = (dp) => {
    var index = this.getIndex();
    var nextItem = this.dict.items[index + 1];
    this.widthPercent += dp;
    nextItem.widthPercent -= dp;
  }

  //wrapper = undefined
}

