import { SliderVM } from "./SliderVM"
import * as apiUtil from '../../util/apiUtil'

export const get = (htmlContents) => {
  var qI = new SliderVM();
  qI.htmlContents = htmlContents;
  return qI;
}

export const getFromApi = (group) => {
  var qI = new SliderVM();

  var data = { group };
  var url = `${apiUtil.API_URL}/hbp/list`
  apiUtil.post(url, data).then(res => {
    var {data} = res;
    var contents = data.map(x => {return x.content });
    qI.setHtmlContents(contents)
  });

  return qI;
}