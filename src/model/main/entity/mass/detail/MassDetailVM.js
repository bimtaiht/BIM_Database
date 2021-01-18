import { makeObservable, observable, action } from 'mobx';
import * as massItemUtil from '../item/MassItemUtil'
import MassDetailTable from './MassDetailTable';

export class MassDetailVM {
  constructor() {
    makeObservable(this, {
      items : observable
    })
  }

  _id
  get id(){
    return this._id;
  }
  set id(v){
    this._id = v;
    massItemUtil.getByViewDetail(v, (items) => {
      this.Items = items;
    })
  }

  items = undefined
  get Items(){
    return this.items;
  } 
  set Items(v){
    this.items = v;
    this.DetailTable.Items = v;
  }

  detailTable
  get DetailTable() {
    if (!this.detailTable){
      this.detailTable = new MassDetailTable();
    }
    return this.detailTable;
  }
}