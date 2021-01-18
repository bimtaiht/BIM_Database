import HtmlRender_IODataVM from "./HtmlRender_IODataVM";

export const get = (htmlContent, manualRender = false) => {
  var qI = new HtmlRender_IODataVM();
  qI.htmlContent = htmlContent;
  qI.manualRender = manualRender
  return qI;
}