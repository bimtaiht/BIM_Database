import { CategoryData } from "../../single/model/CategoryData"
import { PMData } from "../../single/model/PMData";
import { EntFilter } from "./EntFilter"
import * as fct from './FilterCategoryType'
import * as fvt from './FilterValueType'
import * as sft from './StringFilterType'
import * as nft from './NumberFilterType'

export const categoryData = () => {
  return CategoryData.Instance;
}

export const pmData = () => {
  return PMData.Instance;
}

export const get = (q, categoryType) => {
  var qI = new EntFilter();
  qI.ValueType = q.valueType;
  qI.NumberFilterType = q.numberFilterType;
  qI.StringFilterType = q.stringFilterType;
  qI.Values = q.values;
  qI.CategoryType = categoryType;
  return qI;
}

export const GetValueStorageList = (q) => {
  var list = [];

  switch (q.CategoryType) {
    case fct.category:
      list = categoryData().CategoryNames;
      break;
    case fct.parameter:
      list = pmData().ParameterNames;
      break;
  }

  return list;
}

export const GetApiData = (q) => {
  return {
    valueType: q.ValueType,
    numberFilterType: q.NumberFilterType,
    stringFilterType: q.StringFilterType,
    values: q.Values
  }
}

export const IsValid = (filter, value) => {
  if (value === undefined || value === null) return false;

  var isValid = false;
  var filterValues = filter.Values;
  switch (filter.ValueType) {
    case fvt.bystring:
      if (typeof value === 'string') {
        var filterType = filter.StringFilterType;
        switch (filterType) {
          case sft.byequal:
            filterValues.forEach(x => {
              if (!isValid && x === value) {
                isValid = true;
              }
            })
            break;
          case sft.bycontain:
            var lowerVal = value.toLowerCase();
            filterValues.forEach(x => {
              if (!isValid && lowerVal.includes(x.toLowerCase())) {
                isValid = true;
              }
            })
            break;
        }
      }
      break;
    case fvt.bynumber:
      if (!isNaN(value)) {
        var filterType = filter.NumberFilterType;
        switch (filterType) {
          case nft.byequal:
            return value === filterValues[0];
          case nft.bysmaller:
            return value < filterValues[0];
          case nft.bysmallerorequal:
            return value <= filterValues[0];
          case nft.bybigger:
            return value > filterValues[0];
          case nft.bybiggerorequal:
            return value >= filterValues[0];
          case nft.bybetween:
            var leftVal = filterValues[0];
            var rightVal = filterValues[1];
            return (filter.IsEqualLeft && leftVal === value) ||
              leftVal < value && value < rightVal
              || (filter.IsEqualRight && value === rightVal);
        }
      }
      break;
  }

  L1:
  return isValid;
}