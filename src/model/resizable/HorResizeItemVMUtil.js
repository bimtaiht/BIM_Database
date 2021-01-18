import { makeObservable, observable, action } from 'mobx';
import HorResizeItemVM from './HorResizeItemVM';

export const get =(wrapper, widthPercent, height, dict) =>{
  var qI = new HorResizeItemVM();
  qI.wrapper = wrapper;
  qI.widthPercent = widthPercent;
  qI.height = height;
  qI.dict = dict;
  return qI;
}