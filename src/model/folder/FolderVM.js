import { makeObservable, observable, action } from 'mobx';
import { CaretDownFilled, CaretRightFilled } from "@ant-design/icons";
import * as type from '../../constant/objectType'
import * as util from './FolderVMUtil'
import * as fileVMutil from '../file/FileVMUtil'
import FolderView from './FolderView';
import FileView from '../file/FileView';

export default class FolderVM {
  constructor() {
    makeObservable(this, {
      name: observable,
      background: observable,
      isOpenSub: observable,
      subItems: observable,
      fileVMs: observable
    })
  }
  
  type = type.FOLDER

  folder
  supItem

  subItems = undefined
  getSubItems = () => {
    if (!this.subItems) {
      var folderSubItems = this.folder.subItems;
      this.subItems = folderSubItems.map(x => util.getForSub(x, this));
    }
    return this.subItems;
  }
  setSubItems = (value) => {
    this.subItems = value;
  }

  name = undefined;
  getName = () => {
    if (!this.name) {
      this.name = this.folder.name;
    }
    return this.name;
  }
  setContent = (value) => {
    this.name = value;

    this.folder.name = value;
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

  getStyle = () => {
    return {
      width: '100%',
      'display': 'flex',
      background: this.getBackground(),
    }
  }

  getMarginStyle = () => {
    return {
      display: 'flex',
      marginLeft: this.getMarginLeft(),
      marginRight: 10, marginTop: 4
    }
  }

  setSelected = () => {
    this.getGroupVM().setSelectedItem(this);
  }

  groupVM
  getGroupVM = () => {
    if (!this.groupVM) {
      this.groupVM = this.supItem.getGroupVM();
    }
    return this.groupVM;
  }

  getIsHaveSub = () => {
    return this.getSubItems().length !== 0;
  }

  getToggleIcon = () => {
    const clickFunc = () => this.setIsOpenSub(!this.getIsOpenSub());
    var style = { marginLeft: 5, marginRight: 2 };

    var elem = this.getIsOpenSub() ? <CaretDownFilled style={style} onClick={clickFunc} />
      : <CaretRightFilled style={style} onClick={clickFunc} />;
    return elem;
  }

  isOpenSub = false;
  getIsOpenSub = () => {
    return this.isOpenSub;
  }
  setIsOpenSub = (value) => {
    this.isOpenSub = value;
  }

  rank
  getRank = () => {
    if (!this.rank) {
      this.rank = this.folder.getRank();
    }
    return this.rank;
  }

  marginLeft
  getMarginLeft = () => {
    if (!this.marginLeft) {
      this.marginLeft = (this.getRank() - 1) * 20;
    }
    return this.marginLeft;
  }

  fileVMs = undefined
  getFileVMs = () => {
    if (!this.fileVMs) {
      this.fileVMs = this.folder.files.map(x => fileVMutil.get(x, this));
    }
    return this.fileVMs;
  }

  getSubItemViews = () => {
    return this.getSubItems().map((x, i) => {
      return <FolderView key={i} store={x} />
    })
  }

  getFileViews = () => {
    return this.getFileVMs().map((x, i) => {
      return <FileView key={i} store={x} />
    })
  }

  getIndex = () => {
    return this.supItem.subItems.indexOf(this);
  }

  delete = () => {
    //debugger
    this.folder.delete();
    this.getGroupVM().canSetSelected = false;

    var index = this.getIndex();
    var { supItem } = this;
    supItem.subItems.splice(index, 1);
  }

  addSub = (name) => {
    //debugger
    // gọi vào thuộc tính getSubItems để tránh tạo item từ đối tượng đang add
    var subItems = this.getSubItems();
    this.getGroupVM().canSetSelected = false;

    var item = this.folder.addSub(name);
    var itemView = util.getForSub(item, this);
    subItems.push(itemView);

    // Mở SupFolder khi thực hiện thao tác
    if (this.getRank() !== 0) {
      this.setIsOpenSub(true);
    }
    return itemView;
  }

  addFileView = (name) => {
    var fileVMs = this.getFileVMs();
    this.getGroupVM().canSetSelected = false;
    var item = this.folder.addFile(name);
    var itemView = fileVMutil.get(item, this);
    fileVMs.push(itemView);

    // Mở SupFolder khi thực hiện thao tác
    this.setIsOpenSub(true);

    return itemView;
  }
}