import { makeObservable, observable, action } from 'mobx';
import { PMDataVM } from '../../single/form/PMDataVM'
import * as selectVMUtil from '../../../select/SelectVMUtil'
import * as multiSelectVMUtil from '../../../select/MultiSelectVMUtil'

export class EntFilterVM {
  constructor() {
    makeObservable(this, {
    })
  }

  ModelItem

  get pmDataVM () { return PMDataVM.Instance};

  valueType
  get ValueType() {
    if (!this.valueType) {
      this.valueType = this.ModelItem.ValueType;
    }
    return this.valueType;
  }
  set ValueType(v) {
    this.valueType = v;
    this.ModelItem.ValueType = v;
  }

  numberFilterType
  get NumberFilterType() {
    if (!this.numberFilterType) {
      this.numberFilterType = this.ModelItem.NumberFilterType;
    }
    return this.numberFilterType;
  }
  set NumberFilterType(v) {
    this.numberFilterType = v;
    this.ModelItem.NumberFilterType = v;
  }

  stringFilterType
  get StringFilterType() {
    if (!this.stringFilterType) {
      this.stringFilterType = this.ModelItem.StringFilterType;
    }
    return this.stringFilterType;
  }
  set StringFilterType(v) {
    this.stringFilterType = v;
    this.ModelItem.StringFilterType = v;
  }

  values
  get Values() {
    if (!this.values) {
      this.values = this.ModelItem.Values;
    }
    return this.values;
  }
  set Values(v) {
    this.values = v;
    this.ModelItem.Values = v;
  }

  valueStorageList
  get ValueStorageList() {
    if (!this.valueStorageList){
      this.valueStorageList = this.ModelItem.ValueStorageList;
    }
    return this.valueStorageList;
  }

  ValueSelectPlaceholder

  valueTypeSelectVM
  get ValueTypeSelectVM() {
    if (!this.valueTypeSelectVM) {
      var obj =this.valueTypeSelectVM = selectVMUtil.get(this.pmDataVM.FilterValueTypes, this.ValueType);
      obj.OnSelectedItemChanged = (v) => {
        this.ValueType = v;
      }
    }
    return this.valueTypeSelectVM;
  }

  stringFilterTypeSelectVM
  get StringFilterTypeSelectVM() {
    if (!this.stringFilterTypeSelectVM){
      var obj = this.stringFilterTypeSelectVM = selectVMUtil.get(this.pmDataVM.StringFilterTypes, this.StringFilterType);
      obj.OnSelectedItemChanged = (v) => {
        this.StringFilterType = v;
      }
    }
    return this.stringFilterTypeSelectVM;
  }

  valuesSelectVM
  get ValuesSelectVM() {
    if (!this.valuesSelectVM){
      var obj = this.valuesSelectVM = multiSelectVMUtil.get(this.ValueStorageList, this.Values);

      if (this.ValueSelectPlaceholder){
        obj.Placeholder = this.ValueSelectPlaceholder;
      }

      obj.OnSelectedItemChanged = (v) => {
        this.Values = v;
      }
    }
    return this.valuesSelectVM;
  }

  SetData = (v) => {
    if (!v) return;

    var {ValueType, NumberFilterType, StringFilterType, Values} = v;
    this.ValueTypeSelectVM.InitialItem = ValueType;
    this.StringFilterTypeSelectVM.InitialItem = StringFilterType;
    this.ValuesSelectVM.InitialItems = Values;
  }

  OnInitialData = () => {
    var valueType = this.ValueType;
    var numberFilterType = this.NumberFilterType;
    var stringFilterType = this.StringFilterType;
    var values = this.Values;
  }
}