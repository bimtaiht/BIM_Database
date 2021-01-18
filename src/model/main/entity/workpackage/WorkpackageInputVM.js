import { makeObservable, observable, action } from 'mobx';
import * as textVMUtil from '../../../text/TextVMUtil'
import * as checkboxVMUtil from '../../../checkbox/CheckboxVMUtil'
import * as selectVMUtil from '../../../select/SelectVMUtil'
import * as util from './WorkpackageInputVMUtil'
import { Button } from 'antd';

export class WorkpackageInputVM {
  constructor() {
    makeObservable(this, {
      isNew: observable
    })
  }

  WorkpackageInput

  code = undefined
  get Code() {
    if (!this.code) {
      this.code = this.WorkpackageInput.Code;
    }
    return this.code
  }
  set Code(v) {
    this.code = v;
    this.WorkpackageInput.Code = v;
  }

  name = undefined
  get Name() {
    if (!this.name) {
      this.name = this.WorkpackageInput.Name;
    }
    return this.name
  }
  set Name(v) {
    this.name = v;
    this.WorkpackageInput.Name = v;
  }

  description = undefined
  get Description() {
    if (!this.description) {
      this.description = this.WorkpackageInput.Description;
    }
    return this.description
  }
  set Description(v) {
    this.description = v;
    this.WorkpackageInput.Description = v;
  }

  supItem = undefined
  get SupItem(){
    return this.supItem;
  }
  set SupItem(v){
    this.supItem = v;
    var input = this.WorkpackageInput;
    if (!v) {
      input.SupItem = v;
    }else{
      input.SupItem = v.Workpackage;
    }
  }

  workpackageVMStorageList = undefined
  get WorkpackageVMStorageList(){
    if (!this.workpackageVMStorageList){
      this.workpackageVMStorageList = util.GetWorkpackageVMStorageList(this);
    }
    return this.workpackageVMStorageList;
  }
  set WorkpackageVMStorageList(v){
    this.workpackageVMStorageList = v;

    var selectVM = this.SupItemSelectVM;
    selectVM.Items = v;
    selectVM.InitialItem = this.SupItem;
  }

  supItemSelectVM
  get SupItemSelectVM(){
    if (!this.supItemSelectVM){
      var obj = this.supItemSelectVM = selectVMUtil.get
        (this.WorkpackageVMStorageList, this.SupItem);
      obj.Placeholder = 'công tác cha'
      obj.CanClear = true;
      obj.OnSelectedItemChanged = (v) => this.SupItem = v;
    }
    return this.supItemSelectVM;
  }

  isNew = undefined
  get IsNew() {
    if (this.isNew === undefined) {
      this.isNew = this.WorkpackageInput.IsNew;
    }
    return this.isNew;
  }
  set IsNew(v) {
    this.isNew = v;
    this.CommandVM.Content = util.GetCommandName(this);
    this.WorkpackageInput.IsNew = v;
  }

  commandName = undefined
  get CommandName() {
    if (!this.commandName) {
      this.commandName = util.GetCommandName(this);
    }
    return this.commandName;
  }
  set CommandName(v) {
    this.commandName = v;
  }

  workpackageVM
  get WorkpackageVM() {
    return this.workpackageVM;
  }
  set WorkpackageVM(v) {
    this.workpackageVM = v;

    if (!v) {
      this.WorkpackageInput.Workpackage = v;
      this.IsNewVM.Ischecked = true;
    }
    else {
      this.WorkpackageInput.Workpackage = v.Workpackage;

      var { Code, Name, Description, SupItem } = v;
      this.CodeVM.Content = Code;
      this.NameVM.Content = Name;
      this.DescriptionVM.Content = Description;

      this.SupItemSelectVM.InitialItem = SupItem;

      this.IsNewVM.Ischecked = false;
    }
  }

  codeVM
  get CodeVM() {
    if (!this.codeVM) {
      var obj = this.codeVM =
        textVMUtil.get(this.Code, "mã code");
      obj.onSetContent = (v) => this.Code = v;
    }
    return this.codeVM;
  }

  nameVM
  get NameVM() {
    if (!this.nameVM) {
      var obj = this.nameVM =
        textVMUtil.get(this.Name, "tên công tác");
      obj.onSetContent = (v) => this.Name = v;
    }
    return this.nameVM;
  }

  descriptionVM
  get DescriptionVM() {
    if (!this.descriptionVM) {
      var obj = this.descriptionVM =
        textVMUtil.get(this.Description, "mô tả");
      obj.onSetContent = (v) => this.Description = v;
    }
    return this.descriptionVM;
  }

  isNewVM
  get IsNewVM() {
    if (!this.isNewVM) {
      var obj = this.isNewVM
        = checkboxVMUtil.get("Công tác mới", this.IsNew);

      obj.isDisable = true;
      obj.onCheckChange = (v) => {
        this.IsNew = v;
        if (v) {
          obj.isDisable = true;
        } else {
          obj.isDisable = false;
        }
      };
    }
    return this.isNewVM;
  }

  commandVM
  get CommandVM() {
    if (!this.commandVM) {
      var obj = this.commandVM = textVMUtil.get(this.CommandName);
      obj.onSetContent = (v) => this.CommandName = v;
    }
    return this.commandVM;
  }

  AsString = () => `${this.Code} ${this.Name} ${this.Description} ${this.IsNew}`

  AddDatabase = () => {
    this.WorkpackageInput.AddDatabase();
  }

  deleteView
  get DeleteView() {
    return !this.IsNew ?
      <Button onClick={this.DeleteFunc}>Delete</Button>
      : "";
  }

  DeleteFunc = () => {
    this.WorkpackageVM.Workpackage.Delete();
    this.WorkpackageVM = undefined;
  }

  Clear = () => {
    this.CodeVM.Content = null;
    this.NameVM.Content = null;
    this.DescriptionVM.Content = null;
    this.IsNewVM.Ischecked = true;
  }
}