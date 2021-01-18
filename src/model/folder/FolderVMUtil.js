import FolderVM from "./FolderVM";

export const getForSub = (q, supItem) => {
    var qI = new FolderVM();
    qI.folder = q;
    qI.supItem = supItem;
    return qI;
}

export const getForMain = (q, gvm) => {
    var qI = new FolderVM();
    qI.folder = q;
    qI.groupVM = gvm;
    gvm.mainFolderVM = qI;
    return qI;
}