import { makeObservable, observable, action } from 'mobx';
import * as filterVMUtil from '../../../filter/EntFilterVMUtil'
import * as util from './MES_ValueSettingVMUtil'
import * as selectVMUtil from '../../../../../select/SelectVMUtil'

export default class MES_ValueSettingVM {
  // constructor() {
  //   makeObservable(this, {

  //   })
  // }

  get Index() {
    return this.Dict.ValueSettingVMs.indexOf(this);
  }

  retrieveType
  get RetrieveType() {
    if (!this.retrieveType) {
      this.retrieveType = this.ModelItem.RetrieveType;
    }
    return this.retrieveType;
  }
  set RetrieveType(v) {
    this.retrieveType = v;
    this.ModelItem.RetrieveType = v;
  }

  get RetrieveTypeStorageList() {
    return util.GetRetrieveTypeStorageList(this);
  }

  retrieveTypeSelectVM
  get RetrieveTypeSelectVM() {
    if (!this.retrieveTypeSelectVM) {
      var obj = this.retrieveTypeSelectVM = selectVMUtil.get(this.RetrieveTypeStorageList, this.RetrieveType);
      obj.OnSelectedItemChanged = (v) => this.RetrieveType = v;
    }
    return this.retrieveTypeSelectVM;
  }

  valueFilterVM
  get ValueFilterVM() {
    if (!this.valueFilterVM) {
      var obj = this.valueFilterVM = filterVMUtil.get(this.ModelItem.ValueFilter);
      obj.ValueSelectPlaceholder = 'giá trị parameter';
    }
    return this.valueFilterVM;
  }
  set ValueFilterVM(v) {
    this.valueFilterVM = v;
    if (!v) {
      this.ModelItem.ValueFilter = v;
    }
    else {
      this.ModelItem.ValueFilter = v.ModelItem;
    }
  }

  workpackageVM
  get WorkpackageVM() {
    if (!this.workpackageVM) {
      this.workpackageVM = util.GetWorkpackageVM(this);
    }
    return this.workpackageVM;
  }
  set WorkpackageVM(v) {
    this.workpackageVM = v;
    var modelItem = this.ModelItem;
    if (!v) {
      modelItem.Workpackage = v;
    }
    else {
      this.ModelItem.Workpackage = v.Workpackage;
    }
  }

  workpackageVMStorageList = undefined;
  get WorkpackageVMStorageList() {
    if (!this.workpackageVMStorageList) {
      this.workpackageVMStorageList = util.GetWorkpackageVMStorageList(this);
    }
    return this.workpackageVMStorageList;
  }
  set WorkpackageVMStorageList(v) {
    this.workpackageVMStorageList = v;

    var selectVM = this.WorkpackageSelectVM;
    selectVM.Items = v;
    selectVM.SelectedIndex = -1;
  }

  workpackageSelectVM
  get WorkpackageSelectVM() {
    if (!this.workpackageSelectVM) {
      var storageList = this.WorkpackageVMStorageList ?
        this.WorkpackageVMStorageList : [];

      var obj = this.workpackageSelectVM = selectVMUtil.get
        (storageList, this.WorkpackageVM);
      obj.Placeholder = 'chọn công tác';
      obj.OnSelectedItemChanged = (v) => this.WorkpackageVM = v;
    }

    return this.workpackageSelectVM;
  }

  massType
  get MassType() {
    if (!this.massType) {
      this.massType = this.ModelItem.MassType;
    }
    return this.massType;
  }
  set MassType(v) {
    this.massType = v;
    this.ModelItem.MassType = v;
  }

  get MassTypeStorageList() {
    return util.GetMassTypeStorageList(this);
  }

  massTypeSelectVM
  get MassTypeSelectVM() {
    if (!this.massTypeSelectVM) {
      var obj = this.massTypeSelectVM = selectVMUtil.get(this.MassTypeStorageList, 
        this.MassType);
      obj.Placeholder = 'loại khối lượng';
      obj.OnSelectedItemChanged = (v) => this.MassType = v;
    }
    return this.massTypeSelectVM;
  }

  Delete = () => {
    this.ModelItem.Delete();
    var list = this.Dict.ValueSettingVMs;
    list.splice(this.Index, 1);
  }

  SetData = (v) => {
    this.RetrieveTypeSelectVM.InitialItem = v.RetrieveType;
    this.ValueFilterVM.SetData(v.ValueFilterVM);
    this.WorkpackageSelectVM.InitialItem = v.WorkpackageVM;
    this.MassTypeSelectVM.InitialItem = v.MassType;
  }
}