import { makeObservable, observable, action } from 'mobx';
import InputView from '../input/InputView';
import * as textVMUtil from '../text/TextVMUtil'

export class MapItemVM {
  constructor() {
    makeObservable(this, {
      top: observable,
      left: observable,
      name: observable,
      isShowLocationInput: observable,
      canEdit : observable
    })
  }

  wrapper

  top = undefined;
  getTop = () => {
    if (!this.top) {
      this.top = 50
    }
    return this.top;
  }
  setTop = (value) => {
    this.top = value;

    if (this.data){
      this.data.top = value;
      this.parent.saveData();
    }
  }

  left = undefined;
  getLeft = () => {
    if (!this.left) {
      this.left = 50
    }
    return this.left;
  }
  setLeft = (value) => {
    this.left = value;

    if (this.data){
      this.data.left = value;
      this.parent.saveData();
    }
  }

  name = undefined
  getName = () => {
    return this.name;
  }
  setName = (value) => {
    this.name = value;

    if (this.data){
      this.data.name = value;
      this.parent.saveData();
    }
  }

  getStyle = () => {
    return {
      position: 'absolute',
      top: `${this.getTop()}%`,
      left: `${this.getLeft()}%`
    }
  }

  isShowLocationInput = false

  toggleInput = () => {
    this.isShowLocationInput = !this.isShowLocationInput;
  }

  getShowInputView = () =>{
    return this.isShowLocationInput ? this.getInputView() : '';
  }

  nameVM
  getNameVM = () => {
    if (!this.nameVM){
      var obj =this.nameVM = textVMUtil.get(this.name);
      obj.onSetContent = (value) => this.setName(value);
    }
    return this.nameVM;
  }

  canEdit = false

  inputView
  getInputView = () => {
    var leftVM = textVMUtil.get(this.getLeft());
    leftVM.onSetContent = (value) => this.setLeft(value);

    var topVM = textVMUtil.get(this.getTop());
    topVM.onSetContent = (value) => this.setTop(value);

    return (
      <div>
        <div style={{ display: 'table', marginTop: 5 }}>
          <span style={{ display: 'table-cell' }}><b>Name:</b></span>
          <span style={{ display: 'table-cell', width: 10 }}></span>
          <InputView store={this.getNameVM()}/>
        </div>
        <div style={{ display: 'table', marginTop: 5 }}>
          <span style={{ display: 'table-cell' }}><b>Left:</b></span>
          <span style={{ display: 'table-cell', width: 10 }}></span>
          <InputView store={leftVM}/>
        </div>
        <div style={{ display: 'table', marginTop: 5 }}>
          <span style={{ display: 'table-cell' }}><b>Top:</b></span>
          <span style={{ display: 'table-cell', width: 10 }}></span>
          <InputView store={topVM}/>
        </div>
      </div>
      )
  }
}