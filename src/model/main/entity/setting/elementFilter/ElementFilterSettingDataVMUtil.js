import ElementFilterSettingDataVM from './ElementFilterSettingDataVM';

export const get = (q) => {
  var qI = new ElementFilterSettingDataVM();
  qI.ModelItem = q;
  return qI;
}