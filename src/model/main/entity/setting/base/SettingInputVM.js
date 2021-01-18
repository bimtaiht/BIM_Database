import { makeObservable, observable, action } from 'mobx';
import * as textVMUtil from '../../../../text/TextVMUtil'
import * as util from './SettingVMUtil'
import * as checkboxVMUtil from '../../../../checkbox/CheckboxVMUtil'
import { Button, message } from 'antd';

export default class SettingInputVM {
  constructor() {
    makeObservable(this, {
      dataVM : observable,
      isNew: observable
    })
  }

  ModelItem

  name
  get Name(){
    if(!this.name){
      this.name = this.ModelItem.Name;
    }
    return this.name;
  }
  set Name(v){
    this.name = v;
    this.ModelItem.Name = v;
  }

  description
  get Description(){
    if (!this.description){
      this.description = this.ModelItem.Description;
    }
    return this.description;
  }
  set Description(v) {
    this.description = v;
    this.ModelItem.Description = v;
  }

  settingType
  get SettingType(){
    if (!this.settingType){
      this.settingType = this.ModelItem.SettingType;
    }
    return this.settingType;
  }
  set SettingType(v){
    this.settingType = v;
    this.ModelItem.SettingType = v;
  }

  get SearchName() {
    return this.Name;
  }

  nameVM
  get NameVM() {
    if (!this.nameVM){
      var obj = this.nameVM =
        textVMUtil.get(this.Name, "tên bộ lọc");
      obj.onSetContent = (v) => this.Name = v;
    }
    return this.nameVM;
  }

  descriptionVM
  get DescriptionVM() {
    if (!this.descriptionVM){
      var obj = this.descriptionVM =
        textVMUtil.get(this.Description, "mô tả");
      obj.onSetContent = (v) => this.Description = v;
    }
    return this.descriptionVM;
  }

  settingTypeVM
  get SettingTypeVM() {
    if (!this.settingTypeVM){
      var obj = this.settingTypeVM = 
        textVMUtil.get(this.SettingType, "loại thiết lập");
      obj.onSetContent = (v) => this.SettingType = v;
    }
    return this.settingTypeVM;
  }

  dataVM = undefined
  get DataVM(){
    if (!this.dataVM){
      this.dataVM = this.GetDataVM();
    }
    return this.dataVM;
  }
  set DataVM (v){
    if (this.DataVM.SetData){
      this.DataVM.SetData(v);
    }
  }

  GetDataVM = () => {
    if (this.OnGetDataVM){
      var dataVM = this.OnGetDataVM();
      return dataVM;
    }
    return undefined;
  }

  editItem
  get EditItem() {
    return this.editItem;
  }
  set EditItem(v) {
    this.editItem = v;

    var input = this.ModelItem;
    if (!v) {
      input.EditItem = v;
      this.IsNewVM.Ischecked = true;
    }
    else {
      input.EditItem = v.ModelItem;

      var { Name, Description, SettingType } = v;
      this.NameVM.Content = Name;
      this.DescriptionVM.Content = Description;
      this.SettingTypeVM.Content = SettingType;

      this.DataVM = v.DataVM;
      this.IsNewVM.Ischecked = false;
    }
  }

  isNew = undefined
  get IsNew() {
    if (this.isNew === undefined) {
      this.isNew = this.ModelItem.IsNew;
    }
    return this.isNew;
  }
  set IsNew(v) {
    this.isNew = v;
    this.CommandVM.Content = util.GetCommandName(this);
    this.ModelItem.IsNew = v;
  }

  isNewVM
  get IsNewVM() {
    if (!this.isNewVM) {
      var obj = this.isNewVM
        = checkboxVMUtil.get("Thiết lập mới", this.IsNew);

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

  commandVM
  get CommandVM() {
    if (!this.commandVM) {
      var obj = this.commandVM = textVMUtil.get(this.CommandName);
      obj.onSetContent = (v) => this.CommandName = v;
    }
    return this.commandVM;
  }

  deleteView
  get DeleteView() {
    return !this.IsNew ?
      <Button onClick={this.DeleteFunc}>Delete</Button>
      : "";
  }

  
  DeleteFunc = () => {
    this.EditItem.ModelItem.Delete();
    this.EditItem.Delete();
    this.EditItem = undefined;
  }

  AddDatabase = () => {
    this.ModelItem.AddDatabase();
  }
}