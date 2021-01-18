import File from "./File"

export const add = (q, f) => {
    var qI = new File();
    qI.name = q;
    qI.folder = f;
    return qI;
}