import FolderGroupVM from "./FolderGroupVM";

export const get = (q) => {
    var qI = new FolderGroupVM();
    qI.group = q;
    return qI;
}
