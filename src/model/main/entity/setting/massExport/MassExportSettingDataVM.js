import { makeObservable, observable, action } from 'mobx';
import * as filterVMUtil from '../../filter/EntFilterVMUtil'
import * as checkboxVMUtil from '../../../../checkbox/CheckboxVMUtil'
import * as selectVMUtil from '../../../../select/SelectVMUtil'
import * as util from './MassExportSettingDataVMUtil'
import * as valueSettingVMUtil from './exportSetting/MES_ValueSettingVMUtil'
import * as valueSettingUtil from './exportSetting/MES_ValueSettingUtil'

export default class MassExportSettingDataVM {
  constructor() {
    makeObservable(this, {
      valueSettingVMs: observable
    })
  }


  ModelItem

  elementFilterVM
  get ElementFilterVM() {
    if (!this.elementFilterVM) {
      this.elementFilterVM = util.GetElementFilterVM(this);
    }
    return this.elementFilterVM;
  }
  set ElementFilterVM(v) {
    this.elementFilterVM = v;
    var modelItem = this.ModelItem;
    if (!v) {
      modelItem.ElementFilter = v;
    }
    else {
      modelItem.ElementFilter = v.ModelItem;
    }
  }

  elementFilterVMStorageList = undefined
  get ElementFilterVMStorageList() {
    if (!this.elementFilterVMStorageList) {
      this.elementFilterVMStorageList = util.GetElementFilterVMStorageList(this);
    }
    return this.elementFilterVMStorageList;
  }
  set ElementFilterVMStorageList(v) {
    this.elementFilterVMStorageList = v;

    var selectVM = this.ElementFilterSelectVM;
    selectVM.Items = v;
    selectVM.SelectedIndex = 0;
  }

  elementFilterSelectVM
  get ElementFilterSelectVM() {
    if (!this.elementFilterSelectVM) {
      var storageList = this.ElementFilterVMStorageList ? this.ElementFilterVMStorageList : [];

      var obj = this.elementFilterSelectVM = selectVMUtil.get(storageList, this.ElementFilterVM);
      obj.Placeholder = 'chọn bộ lọc'
      obj.OnSelectedItemChanged = (v) => this.ElementFilterVM = v;
    }
    return this.elementFilterSelectVM;
  }

  valueSettingVMs = undefined
  get ValueSettingVMs() {
    if (!this.valueSettingVMs) {
      this.valueSettingVMs = util.GetValueSettingVMs(this);
    }
    return this.valueSettingVMs;
  }
  set ValueSettingVMs(v) {
    var list = this.valueSettingVMs;
    var modelList = this.ModelItem.ValueSettings;

    var oldCount = list.length;
    var newCount = v.length;

    list.forEach((x, i) => {
      if (i >= newCount) return;
      x.SetData(v[i]);
    });

    var delta = Math.abs(oldCount - newCount);
    if (oldCount > newCount) {
      list.splice(newCount, delta);
      modelList.splice(newCount, delta);
    }
    else if (oldCount < newCount) {
      for (var i = 0; i < delta; i++) {
        var originItemVM = v[oldCount + i];

        var item = valueSettingUtil.Clone
          (originItemVM.ModelItem, this.ModelItem);
        modelList.push(item);

        var itemVM = valueSettingVMUtil.get(item, this);
        list.push(itemVM);
      }
    }
  }

  AddNewValueSettingVM = () => {
    var item = this.ModelItem.AddNewValueSetting();
    var itemView = valueSettingVMUtil.get(item, this);
    this.ValueSettingVMs.push(itemView);
    return itemView;
  }

  SetData = (v) => {
    this.ElementFilterSelectVM.InitialItem = v.ElementFilterVM;
    this.ValueSettingVMs = v.ValueSettingVMs;
  }
}