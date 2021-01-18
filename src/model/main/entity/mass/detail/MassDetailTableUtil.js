import * as mt from '../MassType'
import * as mif from '../item/MassItemField'
import ColumnVM from '../../../../table/ColumnVM';

export const GetFields = (q) => {
  var list = q.Items;
  if (!list || list.length === 0) return [];

  var massType = list[0].MassType;
  switch (massType) {
    case mt.rebar:
      return [mif.partition, mif.rebarType, mif.Value, mif.Unit];
    case mt.concrete:
    case mt.formwork:
      return [mif.elementName, mif.Value, mif.Unit];
    default:
      return [mif.Value, mif.Unit]
  }
  return [];
}

export const GetColumns = (q) => {
  return q.Fields.map(x => {
    var col = new ColumnVM();
    col.Name = x;
    return col;
  })
}