import { makeObservable, observable, action } from 'mobx';
import * as filterVMUtil from '../../filter/EntFilterVMUtil'
import * as checkboxVMUtil from '../../../../checkbox/CheckboxVMUtil'

export default class ElementFilterSettingDataVM {
  constructor() {
    makeObservable(this, {
      isHaveFamilyFilter : observable
    })
  }


  ModelItem

  categoryFilterVM
  get CategoryFilterVM(){
    if (!this.categoryFilterVM && this.ModelItem){
      this.categoryFilterVM = this.GetCategoryFilterVM();
    }
    return this.categoryFilterVM;
  }

  GetCategoryFilterVM = () => {
    var filter = this.ModelItem.CategoryFilter;
    return filterVMUtil.get(filter);
  }

  isHaveFamilyFilter = undefined
  get IsHaveFamilyFilter(){
    if (!this.isHaveFamilyFilter){
      this.isHaveFamilyFilter = this.ModelItem.IsHaveFamilyFilter;
    }
    return this.isHaveFamilyFilter;
  }
  set IsHaveFamilyFilter(v){
    this.isHaveFamilyFilter = v;
    this.ModelItem.IsHaveFamilyFilter = v;
  }

  familyFilterVM
  get FamilyFilterVM(){
    if (!this.familyFilterVM && this.ModelItem){
      this.familyFilterVM = this.GetFamilyFilterVM();
    }
    return this.familyFilterVM;
  }

  GetFamilyFilterVM = () => {
    var filter = this.ModelItem.FamilyFilter;
    return filterVMUtil.get(filter);
  }

  isHaveFamilyFilterVM
  get IsHaveFamilyFilterVM() {
    if (!this.isHaveFamilyFilterVM) {
      var obj = this.isHaveFamilyFilterVM
        = checkboxVMUtil.get("Thiết lập lọc Family", this.IsHaveFamilyFilter);

      obj.onCheckChange = (v) => {
        this.IsHaveFamilyFilter = v;
      };
    }
    return this.isHaveFamilyFilterVM;
  }

  SetData = (v) => {
    this.CategoryFilterVM.SetData(v.CategoryFilterVM);

    var ischecked = v.IsHaveFamilyFilter === true;
    this.IsHaveFamilyFilterVM.Ischecked = ischecked;
    
    this.FamilyFilterVM.SetData(v.FamilyFilterVM);
  }
}