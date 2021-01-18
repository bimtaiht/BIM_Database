import { makeObservable, observable, action } from 'mobx';
import * as type from '../../constant/objectType'
import * as viewType from '../../constant/viewType'

import CodeView from '../code/CodeView';
import FolderGroupView from '../folder/FolderGroupView';
import * as folderGroupVMUtil from '../folder/FolderGroupVMUtil'
import HorResizeDictVM from '../resizable/HorResizeDictVM';
import * as resizeItemUtil from '../resizable/HorResizeItemVMUtil'
import * as codeUtil from '../code/CodeUtil'
import * as textVMUtil from '../text/TextVMUtil'
import * as codeVMUtil from '../code/CodeVMUtil'
import DynamicVM from '../dynamicView/DynamicVM';
import DynamicView from '../dynamicView/DynamicView';

export default class CodeProjectVM {
  constructor() {
    makeObservable(this, {
      isFileSelected: observable
    })
  }

  codeProject
  isFileSelected = false

  folderGroupVM
  getFolderGroupVM = () => {
    if (!this.folderGroupVM) {
      this.folderGroupVM =
        folderGroupVMUtil.get(this.codeProject.getFolderGroup());

      this.folderGroupVM.onSelectedItem = (x) => {
        var dynamicVM = this.getDynamicVM();

        if (x && x.type === type.FILE) {
          dynamicVM.currentViewType = viewType.CODEVIEW;
          this.openFile(x);
        } else {
          dynamicVM.currentViewType = viewType.TEXTVIEW;
        }
      }
    }
    return this.folderGroupVM;
  }

  codeVM
  getCodeVM = () => {
    if (!this.codeVM) {
      this.codeVM = codeVMUtil.get(codeUtil.get('Nội dung mồi'));
    }
    return this.codeVM;
  }

  textVM
  getTextVM = () => {
    if (!this.textVM){
      this.textVM = textVMUtil.get('Bạn hãy chọn 1 file!');
    }
    return this.textVM;
  }

  openFile = (f) => {
    var codeVM = this.getCodeVM();
    codeVM.onSetContent = () => { };
    codeVM.setContent(f.getContent());
    codeVM.onSetContent = (value) => f.setContent(value);
  }

  dynamicVM
  getDynamicVM = () => {
    if (!this.dynamicVM){
      var obj = this.dynamicVM = new DynamicVM();
      var inputs = obj.getInputs();
      inputs[viewType.CODEVIEW] = this.getCodeVM();
      inputs[viewType.TEXTVIEW] = this.getTextVM();
      obj.currentViewType = viewType.TEXTVIEW;
    }
    return this.dynamicVM;
  }

  resizeDictVM;
  getResizeDictVM = () => {
    if (!this.resizeDictVM) {
      var dict = this.resizeDictVM = new HorResizeDictVM();

      var w1 = <FolderGroupView store={this.getFolderGroupVM()} />
      var w2 = <DynamicView store={this.getDynamicVM()}/>

      dict.items = [
        resizeItemUtil.get(w1, 20, 150, dict),
        resizeItemUtil.get(w2, 80, 150, dict)
      ]
    }
    return this.resizeDictVM;
  }
}