import { makeObservable, observable, action } from 'mobx';
import * as mif from '../item/MassItemField'
import MassColumn from './MassColumn';
import * as colUtil from './MassColumnUtil'
import * as rowUtil from './MassRowUtil'
import * as cellUtil from './MassCellUtil'
import * as util from './MassTableUtil'
import { PMData } from '../../../single/model/PMData';

export const pmData = () => {
  return PMData.Instance;
}

export default class MassTable {
  constructor() {
    makeObservable(this, {
      IsValidTable: observable,
      Columns: observable,
      MainRows: observable,
      Cells: observable,
      ColumnField: observable
    })
  }


  items
  get Items() {
    return this.items;
  }
  set Items(v) {
    this.items = v;

    if (v && v.length !== 0) {
      this.Build();
      this.IsValidTable = true;
    }
    else {
      this.IsValidTable = false;
    }
  }

  inputWorkpackages
  get InputWorkpackages() {
    return this.inputWorkpackages;
  }
  set InputWorkpackages(v) {
    this.inputWorkpackages = v;
  }

  IsValidTable = false

  ColumnField = mif.Project
  RowField = mif.Workpackage

  Columns = undefined
  MainRows = undefined
  FullRows = undefined
  Cells = undefined

  GetColumn = (v) => {
    var list = this.Columns;
    var item = undefined;
    var index = list.findIndex(x => x.Name === v);
    if (index === -1) {
      item = colUtil.get(v, this);
      list.push(item);
      return item;
    }
    else {
      return list[index];
    }
  }

  GetRowWithCheckField = (fieldValue, field) => {
    var supRow = undefined;

    switch (field) {
      case mif.Workpackage:
        var inputWps = this.InputWorkpackages;
        var wp = fieldValue;
        supRow = !inputWps.includes(wp) ?
          this.GetRow(mif.GetValueString(wp.SupItem, field)) : undefined;
        break;
    }

    return this.GetRow(mif.GetValueString(fieldValue, field), supRow);
  }

  GetRow = (v, supItem) => {
    var list = this.FullRows;
    var mainList = this.MainRows;
    var item = undefined;
    var index = list.findIndex(x => x.Name === v);
    if (index === -1) {
      item = rowUtil.get(v, this);
      list.push(item);

      if (!supItem) {
        mainList.push(item);
      } else {
        supItem.SubItems.push(item);
        item.SupItem = supItem;
      }

      return item;
    }
    else {
      return list[index];
    }
  }

  GetCell = (col, row) => {
    var list = this.Cells;
    var item = undefined;
    var index = list.findIndex(x => x.Column === col && x.Row === row);
    if (index === -1) {
      item = cellUtil.get(col, row, this);
      list.push(item);
      return item;
    }
    else {
      return list[index];
    }
  }

  Build = () => {
    this.Columns = [];
    this.MainRows = [];
    this.FullRows = [];
    this.Cells = [];

    var colField = this.ColumnField;
    var rowField = this.RowField;

    if (colField === mif.Phase){
      pmData().MassResultComp.Phases.forEach(x => {
        var col = this.GetColumn(mif.GetValueString(x, colField));
      })
    }

    const handleItem = (item, colFieldValue) => {
      var col = this.GetColumn(mif.GetValueString(colFieldValue, colField));
      var row = this.GetRowWithCheckField(item[rowField], rowField);
      var cell = this.GetCell(col, row);
      cell.Items.push(item);
    }

    this.Items.forEach(x => {
      switch (colField) {
        case mif.Phase:
          x.ValidPhasesByInput.forEach(y => {
            handleItem(x, y);
          })
          break;
        default:
          handleItem(x, x[colField]);
          break;
      }
    })

    this.FullRows.forEach(x => x.UpdateData());
    this.Cells.forEach(x => x.UpdateData());
  }
}