import HtmlRenderVM from './HtmlRenderVM'

export const get = (q, isFormatContent = false) => {
  var qI = new HtmlRenderVM();
  qI.content = q;
  qI.isFormatContent = isFormatContent
  return qI;
}