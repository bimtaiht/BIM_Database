import { makeObservable, observable, action } from 'mobx';
import CellVM from '../../../../table/CellVM';
import ColumnVM from '../../../../table/ColumnVM';
import RowVM from '../../../../table/RowVM';
import * as mif from '../item/MassItemField'
import * as util from './MassDetailTableUtil'

export default class MassDetailTable {
  constructor() {
    makeObservable(this, {
      items: observable,
      rows: observable
    })
  }

  items = undefined
  get Items() {
    return this.items;
  }
  set Items(v) {
    this.items = v;

    if (v && v.length !== 0) {
      this.IsValidTable = true;
    }
    else {
      this.IsValidTable = false;
    }
    this.Fields = util.GetFields(this);
    this.Rows = this.GetRows();
  }

  IsValidTable = false

  fields = undefined
  get Fields() {
    if (!this.fields) {
      this.fields = util.GetFields(this);
    }
    return this.fields;
  }
  set Fields(v){
    this.fields = v;
    this.Columns = util.GetColumns(this);
  }

  columns = undefined
  get Columns(){
    if (!this.columns){
      this.columns = util.GetColumns(this);
    }
    return this.columns;
  }
  set Columns(v){
    this.columns = v;
  }

  rows = undefined
  get Rows(){
    if (!this.rows){
      this.rows = this.GetRows();
    }
    return this.rows;
  }
  set Rows(v){
    this.rows = v;
  }

  GetRows = () => {
    var items = this.Items;
    if (!items) return [];
    var fields = this.Fields;

    return items.map(x => {
      var row = new RowVM();
      row.Cells = fields.map(y => {
        var cell = new CellVM();
        cell.OnGetValueString = () => {
          var value = cell.Value;
          if(!isNaN(value)){
           return parseFloat(value).toFixed(2);
          }
          return value;
        }

        const setValueFunc = () => cell.Value = mif.GetValueString(x.GetValue(y), y);
        if (mif.GetIdentifyFields().includes(y) && !x.Element){
          x.OnGetElementDone_Funcs.push(() => {
            setValueFunc();
          });
        }else{
          setValueFunc();
        }

        var className = 'text-center';
        switch(y){
          case mif.Value:
            className='text-right';
            break;
        }
        cell.className = className;

        return cell;
      })
      return row;
    })
  }
}