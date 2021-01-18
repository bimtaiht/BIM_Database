import * as api from '../../../../util/apiUtil'
import { PMData } from '../../single/model/PMData';
import { Workpackage } from "./Workpackage";

export const pmData = () => {
  return PMData.Instance;
}

export const get = (dbItem, dict) => {
  var { _id, name, code, description, supId } = dbItem;

  var qI = new Workpackage();
  qI._id = _id;
  qI.Name = name;
  qI.Code = code;
  qI.Description = description;
  qI.SupId = supId;
  qI.Dict = dict;

  return qI;
}

export const GetSupItem = (q) => {
  var supId = q.SupId;
  var list = pmData().Workpackage_Dict.Workpackages;
  var index = list.findIndex(x => x._id === supId);
  return index !== -1 ? list[index] : undefined;
}

export const GetSubItems = (q) => {
  var id = q._id;
  var list = pmData().Workpackage_Dict.Workpackages;
  return list.filter(x => x !== q && x.SupId === id);
}

export const GetUpperList = (q) => {
  var supItem = q.SupItem;
  if (!supItem){
    return [q];
  }else{
    var list = [...supItem.UpperList];
    list.push(q);
    return list;
  }
}

export const GetLowerList = (q) => {
  var list = [q];
  q.SubItems.forEach((x, i) => {
    list.push.apply(list, x.LowerList);
  })
  return list;
}

export const GetRank = (q) => {
  var supItem = q.SupItem;
  return supItem ? supItem.Rank +1 : 0;
}

export const getAll = (dict, handle) => {
  var url = "https://api.bimdev.vn/api/hbwp/list";
  api.get(url).then(response => response.data)
    .then(data => {
      var wps = data.map(x => get(x, dict))
      if (handle) {
        handle(wps);
      }
    });
}