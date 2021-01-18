import * as api from '../../../../util/apiUtil'

export const get = (q) => {
  return q;
}

export const GetById = (_id, handle) => {
  var url = `https://api.bimdev.vn/api/hbe/get?id=${_id}`;
  api.get(url).then(response => response.data)
    .then(data => {
      var item = get(data);
      if (handle) {
        handle(item);
      }
    });
}