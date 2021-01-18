import Folder from "./Folder";

export const getForSub = (q, supItem) => {
    var qI = new Folder();
    qI.name = q;
    qI.supItem = supItem;
    return qI;
}

export const getForMain = (q, g) => {
    var qI = new Folder();
    qI.name = q;
    qI.group = g;
    g.mainFolder = qI;
    return qI;
}