import * as api from '../../../../util/apiUtil'
import Project from './Project';

export const get = (q, dict) => {
  if (!q) return undefined;

  var qI = new Project();

  qI._id = q._id;
  qI.Name = q.name;
  qI.Code = q.code;
  qI.Dict = dict;

  return qI;
}

export const getAll = (dict, handle) => {
  var url = "https://api.bimdev.vn/api/hbp/list";
  api.get(url).then(response => response.data)
    .then(data => {
      var items = data.map(x => get(x, dict))
      if (handle) {
        handle(items);
      }
    });
}

export const getById = (_id, handle) => {
  if (!_id) return undefined;
  var url = `https://api.bimdev.vn/api/hbp/get?id=${_id}`;
  api.get(url).then(response => response.data)
    .then(data => {
      var item = get(data);
      if (handle) {
        handle(item);
      }
    });
}