import { message } from 'antd';
import * as api from '../../../../util/apiUtil'
import * as util from './WorkpackageUtil'

export class Workpackage {
  get Index() {
    return this.Dict.Workpackages.indexOf(this);
  }

  _id

  SupId

  supItem
  get SupItem(){
    if (!this.supItem){
      this.supItem = util.GetSupItem(this);
    }
    return this.supItem;
  }

  code
  get Code() {
    return this.code;
  }
  set Code(v) {
    this.code = v;
    if (this.OnCodeChanged) {
      this.OnCodeChanged(v);
    }
  }

  name
  get Name() {
    return this.name;
  }
  set Name(v) {
    this.name = v;
    if (this.OnNameChanged) {
      this.OnNameChanged(v);
    }
  }

  description
  get Description() {
    return this.description;
  }
  set Description(v) {
    this.description = v;
    if (this.OnDescriptionChanged) {
      this.OnDescriptionChanged(v);
    }
  }

  fullName
  get FullName() {
    if (!this.fullName) {
      this.fullName = this.GetFullName();
    }
    return this.fullName;
  }
  set FullName(v) {
    this.fullName = v;
    if (this.OnFullNameChanged) {
      this.OnFullNameChanged(v);
    }
  }

  subItems
  get SubItems(){
    if (!this.subItems){
      this.subItems = util.GetSubItems(this);
    }
    return this.subItems;
  }
  set SubItems(v){
    this.subItems = v;
  }

  upperList
  get UpperList(){
    if (!this.upperList){
      this.upperList = util.GetUpperList(this);
    }
    return this.upperList;
  }
  set UpperList(v){
    this.upperList = v;
  }

  lowerList
  get LowerList(){
    if (!this.lowerList){
      this.lowerList = util.GetLowerList(this);
    }
    return this.lowerList;
  }
  set LowerList(v){
    this.lowerList = v;
  }

  rank
  get Rank() {
    if (!this.rank){
      this.rank = util.GetRank(this);
    }
    return this.rank;
  }
  set Rank(v){
    this.rank = v;
  }

  get LowerIds() {
    return this.LowerList.map(x => x._id);
  }

  GetFullName = () => {
    return `${this.Code} - ${this.Name}`;
  }

  Delete = () => {
    var { _id } = this;
    var apiData = { _id };

    var url = "https://api.bimdev.vn/api/hbwp/delete";
    api.put(url, apiData).then(response => response.data)
      .then(data => message.success('Delete workpackage successfully'));

    var dict = this.Dict;
    dict.Workpackages.splice(this.Index, 1);
    if (this.OnDelete) {
      this.OnDelete();
    }

    dict.IsDataChanged = true;
  }
}