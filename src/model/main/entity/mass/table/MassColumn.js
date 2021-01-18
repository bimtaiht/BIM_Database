import * as genUtil from '../../../../../util/generalUtil'

export default class MassColumn {
  _id
  get id() {
    if (!this._id){
      this._id = genUtil.randomId();
    }
    return this._id;
  }

  get Index(){
    return this.Dict.Columns.indexOf(this);
  }

  Cells = []
}