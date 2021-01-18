import { makeObservable, observable, action } from 'mobx';

export class SettingVM {
  constructor() {
    makeObservable(this, {
      name: observable
    })
  }

  get M2VM() {
    return this.ModelItem.M2VM;
  }
  set M2VM(v) {
    this.ModelItem.M2VM = v;
  }

  ModelItem

  name = undefined
  get Name() {
    if (!this.name) {
      this.name = this.ModelItem.Name;
    }
    return this.name;
  }
  set Name(v) {
    this.name = v;
    if (!this.M2VM) {
      this.ModelItem.Name = v;
    }
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
    if (!this.M2VM) {
      this.ModelItem.Description = v;
    }
  }

  settingType
  get SettingType() {
    if (!this.settingType) {
      this.settingType = this.ModelItem.SettingType;
    }
    return this.settingType;
  }
  set SettingType(v) {
    this.settingType = v;
    this.ModelItem.SettingType = v;
  }

  get SearchName() {
    return this.Name;
  }

  get DisplayContent() {
    return this.Name;
  }

  data
  get Data(){
    if (!this.data){
      this.data = this.ModelItem.Data;
    }
    return this.data;
  }
  set Data(v) {
    this.data = v;
    if (!this.M2VM){
      this.ModelItem.Data = v;
    }
  }

  dataVM
  get DataVM() {
    if (!this.dataVM) {
      this.dataVM = this.GetDataVM();
    }
    return this.dataVM;
  }
  set DataVM(v) {
    this.dataVM = v;

    // Gọi hàm để đổ dữ liệu về
    if (v && this.OnInitialSetDataVM){
      this.OnInitialSetDataVM(v);
    }

    if (!this.M2VM) {
      if (!v) {
        this.Data = v;
      }
      else {
        this.Data = v.ModelItem;
      }
    }
  }

  GetDataVM = () => {
    if (this.OnGetDataVM) {
      return this.OnGetDataVM();
    }
    return undefined;
  }

  get Index() {
    return this.Dict.Items.indexOf(this);
  }

  Delete = () => {
    this.Dict.Items.splice(this.Index, 1);
  }
}