import Code from "./Code"

export const get =(q) => {
    var code = new Code();
    code.content = q;
    return code;
}