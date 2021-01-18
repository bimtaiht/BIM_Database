import CodeVM from './CodeVM'

export const get = (q) => {
    var qI = new CodeVM();
    qI.code = q;
    return qI;
}