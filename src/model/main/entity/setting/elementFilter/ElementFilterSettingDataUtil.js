import { EntFilter } from '../../filter/EntFilter';
import * as filterUtil from '../../filter/EntFilterUtil'
import ElementFilterSettingData from './ElementFilterSettingData';
import * as fvt from '../../filter/FilterValueType'
import * as sft from '../../filter/StringFilterType'
import * as fct from '../../filter/FilterCategoryType'

export const get = (q) => {
  var qI = new ElementFilterSettingData();
  qI.CategoryFilter = filterUtil.get(q.categoryFilter);
  return qI;
}

export const getDefault = () => {
  var qI = new ElementFilterSettingData();

  var cateFilter = new EntFilter();
  cateFilter.CategoryType = fct.category;
  cateFilter.ValueType = fvt.bystring;
  cateFilter.StringFilterType = sft.byequal;
  cateFilter.Values = ['Floors'];
  qI.CategoryFilter = cateFilter;

  qI.IsHaveFamilyFilter = false;

  var familyFilter = new EntFilter();
  familyFilter.CategoryType = fct.family;
  familyFilter.ValueType = fvt.bystring;
  familyFilter.StringFilterType = sft.byequal;
  familyFilter.Values = [];
  qI.FamilyFilter = familyFilter;

  return qI;
}

export const GetApiData = (q) => {
  return {
    categoryFilter : q.CategoryFilter.ApiData,
    familyFilter : q.IsHaveFamilyFilter ? 
      q.FamilyFilter.ApiData : undefined
  }
}