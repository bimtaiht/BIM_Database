import { makeObservable, observable, action } from 'mobx';
import * as textVMUtil from '../../../text/TextVMUtil'
import * as util from './WorkpackageVMUtil'

export class WorkpackageVM {
  constructor() {
    makeObservable(this, {
      fullName : observable
    })
  }

  get Index(){
    return this.Dict.WorkpackageVMs.indexOf(this);
  }

  get M2VM() {
    return this.Workpackage.M2VM;
  }
  set M2VM(v) {
    this.Workpackage.M2VM = v;
  }

  Workpackage

  supItem
  get SupItem(){
    if (!this.supItem){
      this.supItem = util.GetSupItem(this);
    }
    return this.supItem;
  }

  code = undefined
  get Code() {
    if (!this.code) {
      this.code = this.Workpackage.Code;
    }
    return this.code
  }
  set Code(v) {
    this.code = v;
    if (!this.M2VM) {
      this.Workpackage.Code = v;
    }
  }

  name = undefined
  get Name() {
    if (!this.name) {
      this.name = this.Workpackage.Name;
    }
    return this.name
  }
  set Name(v) {
    this.name = v;
    if (!this.M2VM) {
      this.Workpackage.Name = v;
    }
  }

  description = undefined
  get Description() {
    if (!this.description) {
      this.description = this.Workpackage.Description;
    }
    return this.description
  }
  set Description(v) {
    this.description = v;
    if (!this.M2VM) {
      this.Workpackage.Description = v;
    }
  }

  fullName = undefined
  get FullName() {
    if (!this.fullName) {
      this.fullName = this.Workpackage.FullName;
    }
    return this.fullName;
  }
  set FullName(v) {
    this.fullName = v;
  }

  get SearchName() {
    return this.FullName;
  }

  get DisplayContent() {
    return this.FullName;
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

  Delete = () => {
    this.Dict.WorkpackageVMs.splice(this.Index, 1);
  }

  AsString = () => {
    console.log(this.Name, this.Code, this.Description);
  }
}