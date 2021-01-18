import { makeObservable, observable, action } from 'mobx';

export class SelectVM {
  constructor() {
    makeObservable(this, {
      items : observable,
      selectedIndex : observable,
      CanClear :observable
    })
  }

  items = undefined
  get Items(){
    if (!this.items){
      this.items = [];
    }
    return this.items;
  }
  set Items(v){
    this.items = v;
  }

  initialItem = undefined
  get InitialItem() {
    return this.initialItem;
  }
  set InitialItem(v){
    this.initialItem = v;
    this.InitialIndex = this.GetInitialIndex();
    this.SelectedIndex = this.InitialIndex;
  }

  initialIndex
  get InitialIndex(){
    if (!this.initialIndex){
      this.initialIndex = this.GetInitialIndex();
    }
    return this.initialIndex;
  }
  set InitialIndex(v){
    this.initialIndex = v;
  }

  GetInitialIndex = () => {
    var index = this.Items.indexOf(this.InitialItem);
    return index !== -1 ? index : null;
  }

  selectedIndex = undefined
  get SelectedIndex(){
    return this.selectedIndex;
  }
  set SelectedIndex(v){
    this.selectedIndex = v;
    this.SelectedItem = this.GetSelectedItem();
  }

  selectedItem
  get SelectedItem (){
    if (!this.selectedItem){
      this.selectedItem = this.GetSelectedItem();
    }
    return this.selectedItem;
  }
  set SelectedItem (v) {
    this.selectedItem = v;
    if (this.OnSelectedItemChanged){
      this.OnSelectedItemChanged(v);
    }
  }

  GetSelectedItem = () => {
    var index = this.SelectedIndex;
    if (index === -1) return undefined;
    return this.Items[index];
  }

  placeholder
  get Placeholder(){
    if (!this.placeholder){
      this.placeholder = "chọn đối tượng ...";
    }
    return this.placeholder;
  }
  set Placeholder(v){
    this.placeholder = v;
  }

  CanClear = false

  Clear = () => {
    this.SelectedIndex = null
  }
  
  get DivStyle() {
    return this.CanClear ? { 
      position: 'relative', 
      padding: '0 22px 0 0' 
    } : {};
  }
}