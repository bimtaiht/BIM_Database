import Column from "antd/lib/table/Column";
import { PMData } from "../../../single/model/PMData";
import MassCell from "./MassCell"
import * as mif from '../item/MassItemField'
import * as filterUtil from '../../filter/EntFilterUtil'

export const pmData = () => {
  return PMData.Instance;
}

export const get = (col, row, dict) => {
  var qI = new MassCell();
  qI.Column = col;
  qI.Row = row;
  qI.Dict = dict;

  col.Cells.push(qI);
  row.Cells.push(qI);

  return qI;
}

export const GetIsHaveVCS_Item = (q) => {
  return q.Dict.ColumnField === mif.Phase 
    && pmData().MassResultComp.Phases.length === 2
    && q.ColumnIndex === 1;
}

export const GetValueColor = (q) => {
  if (q.IsHaveVCS_Item && q.VCS_Item){
    return '#FFFFFF';
  } else{
    return '#1890ff';
  }
}

export const GetTDBgColor = (q) => {
  if (q.IsHaveVCS_Item && q.VCS_Item){
    return q.VCS_Item.Color;
  } else{
    return '#FFFFFF';
  }
}

export const GetVCS_Item = (q) => {
  var list = pmData().VersionCompareSetting.Items;

  var cells = q.Row.Cells;
  var compareIndex = cells.findIndex(x => x.ColumnIndex === 0); 
  var compareItem = cells[compareIndex];
  var ratio = q.TotalValue / compareItem.TotalValue;

  var index = list
    .findIndex(x => filterUtil.IsValid(x.Filter, ratio));
  return index !== -1 ? list[index] : undefined;
}