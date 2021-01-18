import * as api from '../../../../util/apiUtil'
import * as workPackageUtil from '../../entity/workpackage/WorkpackageUtil'
import * as fvt from '../../entity/filter/FilterValueType'
import * as sft from '../../entity/filter/StringFilterType'
import * as vrt from '../../entity/setting/massExport/exportSetting/MES_ValueRetrieveType'
import * as mpn from '../../entity/mass/MassPropertyName'
import * as mt from '../../entity/mass/MassType'

export const GetWorkpackages = async (data) => {
  var url = "https://api.bimdev.vn/api/hbwp/list";
  return await api.get(url).then(response => response.data)
    .then(data => data.map(x => workPackageUtil.get(x)));
}

export const GetFilterValueTypes = (data) => {
  return fvt.GetAll();
}

export const GetStringFilterTypes = (data) => {
  return sft.GetAll();
}

export const GetValueRetrieveTypes = (data) => {
  return vrt.GetAll();
}

export const GetCategoryNames = (data) => {
  return ['Floors', 'Structural Framing', 'Walls', 'Structural Column']
}

export const GetParameterNames = (data) => {
  return ['Volume', 'HB_Formwork_Total']
}

export const GetMassPropertyNames = (data) => {
  return mpn.GetAll();
}

export const GetMassTypes = (data) => {
  return mt.GetAll();
}