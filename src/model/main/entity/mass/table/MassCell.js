import { makeObservable, observable, action } from 'mobx';
import * as textVMUtil from '../../../../text/TextVMUtil'
import * as api from '../../../../../util/apiUtil'
import * as genUtil from '../../../../../util/generalUtil'
import * as mif from '../item/MassItemField'
import { PMData } from '../../../single/model/PMData';
import * as util from './MassCellUtil'

export const pmData = () => {
  return PMData.Instance;
}

export default class MassCell {
  constructor() {
    makeObservable(this, {
      valueColor: observable,
      tdBgColor : observable
    })
  }

  _id
  get id() {
    if (!this._id) {
      this._id = genUtil.randomId();
    }
    return this._id;
  }

  get ColumnIndex() {
    //return this.Row.Cells.indexOf(this);
    return this.Column.Index;
  }

  items = []
  get Items() {
    return this.items;
  }
  set Items(v) {
    this.items = v;
  }

  unit
  get Unit() {
    if (!this.unit) {
      this.unit = this.GetUnit();
    }
    return this.unit;
  }
  set Unit(v) {
    this.unit = v;
  }

  GetUnit = () => {
    if (this.SubCells) {
      var unit = undefined;
      this.SubCells.forEach(x => {
        if (x.Unit) {
          unit = x.Unit;
        }
      })
      return unit;
    }
    return this.Items && this.Items.length !== 0 ? this.Items[0].Unit : undefined;
  }

  unitVM
  get UnitVM() {
    if (!this.unitVM) {
      this.unitVM = textVMUtil.get(this.Unit);
      this.unitVM.OnSetContent = (v) => this.Unit = v;
    }
    return this.unitVM;
  }

  totalValue = undefined
  get TotalValue() {
    if (!this.totalValue) {
      this.totalValue = this.GetTotalValue();
    }
    return this.totalValue;
  }
  set TotalValue(v) {
    this.totalValue = v;
  }

  GetTotalValue = () => {
    if (this.SubCells) {
      return this.SubCells.reduce((a, b) => a + b.TotalValue, 0);
    }
    return this.Items.reduce((a, b) => a + b.Value, 0);
  }

  contentVM
  get ContentVM() {
    if (!this.contentVM) {
      this.contentVM = textVMUtil.get(this.ValueString);
    }
    return this.contentVM;
  }

  get ValueString() {
    var unit = this.Unit ? this.Unit : '';
    return `${this.TotalValue.toFixed(2)} ${unit}`;
  }

  subCells
  get SubCells() {
    if (!this.subCells) {
      this.subCells = this.GetSubCells();
    }
    return this.subCells;
  }
  set SubCells(v) {
    this.subCells = v;
  }

  GetSubCells = () => {
    var subRows = this.Row.SubItems;
    if (subRows && subRows.length !== 0) {
      var col = this.Column;
      return subRows.map(x => x.GetCellByColumn(col))
        .filter(x => x !== undefined);
    }
  }

  massType
  get MassType() {
    if (!this.massType) {
      this.massType = this.GetMassType();
    }
    return this.massType;
  }
  set MassType(v) {
    this.massType = v;
  }

  GetMassType = () => {
    return this.SubCells ? this.SubCells[0].MassType : this.Items[0].MassType;
  }

  AsString = () => {
    console.log(`${this.Column.Name} - ${this.Row.Name} - ${this.TotalValue}`)
  }

  UpdateData = () => {
    this.SubCells = this.GetSubCells();
    this.TotalValue = this.GetTotalValue();
    this.Unit = this.GetUnit();
    this.ContentVM.Content = this.ValueString;
    this.MassType = this.GetMassType();
    this.IsHaveVCS_Item = util.GetIsHaveVCS_Item(this);
    
    if (this.IsHaveVCS_Item){
      //debugger
      this.VCS_Item = util.GetVCS_Item(this);
    }

    this.ValueColor = util.GetValueColor(this);
    this.TDBgColor = util.GetTDBgColor(this);
  }

  ShowDetail = () => {
    if (!this.viewDetailId) {
      this.GetViewDetailId(data => {
        var _id = this.viewDetailId = data._id;
        window.open(`/massdetail/${_id}`, "_blank");
      })
    } else {
      window.open(`/massdetail/${this.viewDetailId}`, "_blank");
    }
  }

  viewDetailId

  get AllItems() {
    if (this.SubCells) {
      return this.SubCells.map(x => x.Items).reduce((a, b) => a.concat(b), []);
    }
    return this.Items;
  }

  isHaveVCS_Item
  get IsHaveVCS_Item(){
    if (!this.isHaveVCS_Item){
      this.isHaveVCS_Item = util.GetIsHaveVCS_Item(this);
    }
    return this.isHaveVCS_Item;
  }
  set IsHaveVCS_Item(v){
    this.isHaveVCS_Item = v;
  }

  vcs_Item
  get VCS_Item(){
    if (!this.vcs_Item){
      this.vcs_Item = util.GetVCS_Item(this);
    }
    return this.vcs_Item;
  }
  set VCS_Item(v){
    this.vcs_Item = v;
  }

  valueColor = undefined
  get ValueColor() {
    if (!this.valueColor) {
      this.valueColor = util.GetValueColor(this);
    }
    return this.valueColor;
  }
  set ValueColor(v){
    this.valueColor = v
  }

  tdBgColor = undefined
  get TDBgColor() {
    if (!this.tdBgColor) {
      this.tdBgColor = util.GetTDBgColor(this);
    }
    return this.tdBgColor;
  }
  set TDBgColor(v){
    this.tdBgColor = v;
  }

  get AStyle() {
    return {
      color: this.ValueColor,
      'font-weight': 'bold'
    }
  }

  
  get TDStyle() {
    return {
      'background-color': this.TDBgColor
    }
  }

  ApiData = () => {
    var massIds = this.AllItems.map(x => x._id);
    return {
      massType: this.MassType,
      massIds
    };
  }

  GetViewDetailId = (handle) => {
    var apiData = this.ApiData();
    var url = "https://api.bimdev.vn/api/hbdv/updatemass";
    api.put(url, apiData).then(response => response.data)
      .then(data => handle(data))
  }
}