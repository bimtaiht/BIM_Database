import FileVM from "./FileVM";

export const get = (q, fvm) => {
    var qI = new FileVM();
    qI.file = q;
    qI.folderVM = fvm;
    return qI;
}