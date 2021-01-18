import { makeObservable, observable, action } from 'mobx';
import * as type from '../../constant/objectType'

export default class FileVM {
  constructor() {
    makeObservable(this, {
      name: observable,
      content: observable,
      background: observable
    })
  }

  type = type.FILE
  
  file
  folderVM

  name = undefined
  getName = () => {
    if (!this.name){
      this.name = this.file.name;
    }
    return this.name;
  }
  setName = (value) => {
    this.name = value;
    this.file.name = value;
  }

  content = undefined
  getContent = () => {
    if (!this.content){
      this.content = this.file.getContent();
    }
    return this.content;
  }
  setContent = (value) => {
    this.content = value;
    this.file.setContent(value);
  }

  background = undefined;
  getBackground = () => {
    if (!this.background) {
      this.background = "";
    }
    return this.background;
  }
  setBackground = (value) => {
    this.background = value;
  }

  rank
  getRank = () => {
    if (!this.rank){
      this.rank = this.file.getRank();
    }
    return this.rank;
  }

  marginLeft
  getMarginLeft = () => {
    if (!this.marginLeft){
      this.marginLeft = (this.getRank() -1) * 20 + 21;
    }
    return this.marginLeft;
  }

  getStyle = () => {
    return {
      width: '100%',
      'display': 'flex',
      background: this.getBackground(),
    }
  }

  getMarginStyle = () => {
    return  {
      display:'flex',
      marginLeft: this.getMarginLeft(),
      marginRight:10, marginTop:4
    }
  }
  
  groupVM
  getGroupVM = () => {
    if (!this.groupVM) {
      this.groupVM = this.folderVM.getGroupVM();
    }
    return this.groupVM;
  }

  setSelected = () => {
    this.getGroupVM().setSelectedItem(this);
  }

  getIndex = () => {
    return this.folderVM.fileVMs.indexOf(this);
  }

  delete = () => {
    this.file.delete();
    this.getGroupVM().canSetSelected = false;

    var index = this.getIndex();
    var { folderVM } = this;
    folderVM.fileVMs.splice(index, 1);
  }
}