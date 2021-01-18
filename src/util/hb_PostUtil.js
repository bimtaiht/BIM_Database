import * as apiUtil from './apiUtil'

export const get = (group, handle) => {
  var data = { group };
  var url = `${apiUtil.API_URL}/hbp/list`
  apiUtil.post(url, data).then(res => {
    var { data } = res;
    handle(data);
    // var contents = data.map(x => {return x.content });
    // qI.setHtmlContents(contents)
  });
}