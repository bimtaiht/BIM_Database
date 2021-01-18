import * as textVMUtil from '../../../text/TextVMUtil'

export default class PhaseInputVM {
  name = undefined
  get Name() {
    if (!this.name) {
      this.name = this.ModelItem.Name;
    }
    return this.name;
  }
  set Name(v) {
    this.name = v;
    this.ModelItem.Name = v;
  }

  description
  get Description() {
    if (!this.description) {
      this.description = this.ModelItem.Description;
    }
    return this.description;
  }
  set Description(v) {
    this.description = v;
    this.ModelItem.Description = v;
  }

  nameVM
  get NameVM() {
    if (!this.nameVM){
      var obj = this.nameVM =
        textVMUtil.get(this.Name, "tên version");
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
}