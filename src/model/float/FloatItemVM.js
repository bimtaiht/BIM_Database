import { makeObservable, observable, action } from 'mobx';

export default class FloatItemVM {
  location

  className
  getClassName = () => {
    if (!this.className){
      this.className = `float ${this.location}`;
    }
    return this.className
  }
}