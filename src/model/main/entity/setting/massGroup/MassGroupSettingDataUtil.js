import { PMData } from '../../../single/model/PMData';
import MassGroupSettingData from './MassGroupSettingData';
import * as mpn from '../../../entity/mass/MassPropertyName'

export const pmData = ()  =>{
  return PMData.Instance;
}

export const get = (q) => {
  var qI = new MassGroupSettingData();
  qI.Fields = q.fields
  return qI;
}

export const GetDefault = () => {
  var qI = new MassGroupSettingData();
  return qI;
}

export const GetDefaultFields = () => {
  return [ mpn.Category ]
}

export const GetApiData = (q) => {
  return {
    fields : q.Fields
  }
}