import { PMDataVM } from '../../../single/form/PMDataVM';
import MassGroupSettingDataVM from './MassGroupSettingDataVM';
import * as fieldVMUtil from './field/MGS_FieldVMUtil'
import testUtils from 'react-dom/test-utils';

export const pmDataVM = () => {
  return PMDataVM.Instance;
}

export const get = (q) => {
  var qI = new MassGroupSettingDataVM();
  qI.ModelItem = q;

  return qI;
}

export const GetFieldVMs = (q) => {
  var fields = q.ModelItem.Fields;
  return fields.map(x => fieldVMUtil.get(x, q));
}