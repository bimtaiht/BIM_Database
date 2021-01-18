import EditorRenderVM from "./EditorRenderVM";

export const get = (q) => {
  var qI = new EditorRenderVM(q);
  qI.editorRender = q;
  return qI;
}