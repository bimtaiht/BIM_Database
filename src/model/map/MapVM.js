import { Button } from 'antd';
import { makeObservable, observable, action } from 'mobx';
import TextView from '../text/TextView';
import MapItemView from './MapItemView';
import * as mapItemVMUtil from './MapItemVMUtil'

export class MapVM {
  constructor() {
    makeObservable(this, {
      items: observable,
    })
  }

  data
  getData = () => {
    if (!this.data) {
      if (localStorage.getItem('map') === null) {
        this.data = [
          { left: 30, top: 15, name: 'Database' },
          { left: 30, top: 30, name: 'WebAPI' },
          { left: 40, top: 30, name: 'FrontEnd' },
          { left: 20, top: 30, name: 'BIM app' }
        ]
        this.setStorage(this.data);
      } else {
        this.data = this.getStorage();
      }
    }
    return this.data;
  }
  saveData = () => {
    this.setStorage(this.data);
  }

  setStorage = (data) => {
    localStorage.setItem('map', JSON.stringify(data))
  }
  getStorage = () => {
    return JSON.parse(localStorage.getItem('map'));
  }

  items = undefined
  getItems = () => {
    if (!this.items) {
      this.getData();

      var obj = this.getData().map(x => {
        return mapItemVMUtil.getDefaultTemplate(x, this);
      })

      this.items = obj;
    }
    return this.items;
  }

  addItem = () => {
    var item = { left: 5, top: 5, name: 'New Item' };    
    this.getItems().push(mapItemVMUtil.getDefaultTemplate(item, this));

    this.getData().push(item);
    this.saveData();
  }

  request = (data) => {
    if (this.onRequest){
      this.onRequest(data);
    }
  }

  getReactElements = () => {
    var x = 3;

    return this.getItems().map((x, i) => {
      return <MapItemView key={i} store={x} />
    })
  }
}