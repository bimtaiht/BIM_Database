import { makeObservable, observable, action } from 'mobx';
import * as filterVMUtil from '../../filter/EntFilterVMUtil'
import * as checkboxVMUtil from '../../../../checkbox/CheckboxVMUtil'
import * as selectVMUtil from '../../../../select/SelectVMUtil'
import * as util from './MassGroupSettingDataVMUtil'
import * as fieldVMUtil from './field/MGS_FieldVMUtil'

export default class MassGroupSettingDataVM {
  constructor() {
    makeObservable(this, {
      fieldVMs : observable
    })
  }


  ModelItem

  fieldVMs = undefined
  get FieldVMs(){
    if (!this.fieldVMs){
      this.fieldVMs = util.GetFieldVMs(this);
    }
    return this.fieldVMs;
  }
  set FieldVMs(v){
    var list = this.fieldVMs;
    var modelList = this.ModelItem.Fields;

    var oldCount = list.length;
    var newCount = v.length;

    list.forEach((x, i) => {
      if (i >= newCount) return;
      x.SetData(v[i]);
    });

    var delta = Math.abs(oldCount - newCount);
    if (oldCount > newCount){
      list.splice(newCount, delta);
      modelList.splice(newCount, delta);
    }
    else if (oldCount < newCount){
      for (var i = 0; i < delta; i++) {
        var originItemVM = v[oldCount + i];

        var item = originItemVM.Field;
        modelList.push(item);

        var itemVM = fieldVMUtil.get(item,this);
        list.push(itemVM);
      }
    }
  }

  AddNewFieldVM = () => {
    var item = this.ModelItem.AddNewField();
    var itemView = fieldVMUtil.get(item, this);
    this.FieldVMs.push(itemView);
    return itemView;
  }

  SetData = (v) => {
    this.FieldVMs = v.FieldVMs;
  }
}