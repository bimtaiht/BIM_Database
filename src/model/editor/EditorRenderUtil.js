import EditorRender from "./EditorRender"

export const get = (q) => {
  var qI = new EditorRender(q);
  qI.content = q;
  return qI;
}