import { makeObservable, observable, action } from 'mobx';
import TextView from '../../../../text/TextView';
import * as textVMUtil from '../../../../text/TextVMUtil';
import * as util from './MassRowUtil'
import * as genUtil from '../../../../../util/generalUtil'

export default class MassRow {
  constructor() {
    makeObservable(this, {
      rank: observable,
      isShowSub: observable,
      isHaveSub : observable
    })
  }

  _id
  get id() {
    if (!this._id){
      this._id = genUtil.randomId();
    }
    return this._id;
  }

  get Index() {
    return this.Dict.FullRows.indexOf(this);
  }

  SubItems = []

  Cells = []

  isShowSub = true
  get IsShowSub(){
    return this.isShowSub;
  }
  set IsShowSub(v){
    this.isShowSub = v;
    this.ToggleButtonContentVM.Content = util.GetToggleButtonContent(this);
  }

  toggleButtonContent
  get ToggleButtonContent(){
    if (!this.toggleButtonContent){
      this.toggleButtonContent = util.GetToggleButtonContent(this);
    }
    return this.toggleButtonContent;
  }
  set ToggleButtonContent(v){
    this.toggleButtonContent = v;
  }

  toggleButtonContentVM
  get ToggleButtonContentVM(){
    if (!this.toggleButtonContentVM){
      var obj =this.toggleButtonContentVM = textVMUtil.get(this.ToggleButtonContent);
      obj.OnSetContent = (v) => this.ToggleButtonContent = v;
    }
    return this.toggleButtonContentVM;
  }

  rank = undefined
  get Rank() {
    if (this.rank === undefined) {
      this.rank = util.GetRank(this);
    }
    return this.rank;
  }
  set Rank(v) {
    this.rank = v;
  }

  isHaveSub = undefined
  get IsHaveSub(){
    if (!this.isHaveSub){
      this.isHaveSub = util.GetIsHaveSub(this);
    }
    return this.isHaveSub;
  }
  set IsHaveSub(v){
    this.isHaveSub = v;
  }

  get Style() {
    return util.GetStyle(this);
  }

  GetCellByColumn = (col) => {
    var index = this.Cells.findIndex(x => x.Column === col);
    return index !== -1 ? this.Cells[index] : undefined;
  }

  UpdateData = () => {
    this.Rank = util.GetRank(this);
    this.IsHaveSub = util.GetIsHaveSub(this);
  }

  ToggleSub =() => {
    this.IsShowSub = !this.IsShowSub;
  }
}