import { makeObservable, observable, action } from 'mobx';

export class MultiSelectVM {
  constructor() {
    makeObservable(this, {
      items: observable,
      selectedIndexs: observable
    })
  }

  items = undefined
  get Items() {
    return this.items;
  }
  set Items(v) {
    this.items = v;
  }

  initialItems;
  get InitialItems() {
    return this.initialItems;
  }
  set InitialItems(v){
    this.initialItems = v;
    this.InitialIndexs = this.GetInitialIndexs();
    this.SelectedIndexs = this.InitialIndexs;
  }

  initialIndexs;
  get InitialIndexs() {
    if (!this.initialIndexs) {
      this.initialIndexs = this.GetInitialIndexs();
    }
    return this.initialIndexs;
  }
  set InitialIndexs(v){
    this.initialIndexs = v;
  }

  GetInitialIndexs =() => {
    var initialItems = this.InitialItems;
    if (!initialItems) return [];
    return initialItems.map(x => this.Items.indexOf(x)).filter(x => x !== -1);
  }

  selectedIndexs = []
  get SelectedIndexs() {
    return this.selectedIndexs;
  }
  set SelectedIndexs(v) {
    this.selectedIndexs = v;
    this.SelectedItems = this.GetSelectedItems();
  }

  selectedItems
  get SelectedItems() {
    if (!this.selectedItems) {
      this.selectedItems = this.GetSelectedItems();
    }
    return this.selectedItems;
  }
  set SelectedItems(v) {
    this.selectedItems = v;
    if (this.OnSelectedItemChanged) {
      this.OnSelectedItemChanged(v);
    }
  }

  GetSelectedItems = () => {
    return this.SelectedIndexs.map(x => this.Items[x]);
  }

  placeholder
  get Placeholder() {
    if (!this.placeholder) {
      this.placeholder = "chọn đối tượng ...";
    }
    return this.placeholder;
  }
  set Placeholder(v) {
    this.placeholder = v;
  }
}