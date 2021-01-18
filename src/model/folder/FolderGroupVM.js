import { makeObservable, observable, action } from 'mobx';
import * as folderVMUtil from './FolderVMUtil'

export default class FolderGroupVM {
  constructor() {
    makeObservable(this, {
      selectedItem: observable,
    })
  }

  group

  selectedFolder
  canSetSelected = true;

  mainFolderVM = undefined
  getMainFolderVM = () => {
    if (!this.mainFolderVM){
      this.mainFolderVM = folderVMUtil.getForMain(this.group.getMainFolder(), this);
    }
    return this.mainFolderVM;
  }

  width
  getWidth = () => {
    if (!this.width){
      this.width = '100%';
    }
    return this.width;
  }

  getStyle = () => {
    return {
      width: this.getWidth(),
      background: "#f0f0f0"
    }
  }

  selectedItem = undefined
  setSelectedItem = (item) => {
    if (this.canSetSelected) {
      var { selectedItem } = this;
      if (selectedItem) {
        selectedItem.setBackground('');
      }

      this.selectedItem = item;
      item.setBackground('#757fbd');

      this?.onSelectedItem(item);
    }
    this.canSetSelected = true;
  }

  addFolderVM = (name) => {
    this.getMainFolderVM().addSub(name);
  }
}