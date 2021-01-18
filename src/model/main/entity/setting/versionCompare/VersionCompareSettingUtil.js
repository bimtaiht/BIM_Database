import { EntFilter } from '../../filter/EntFilter'
import * as fvt from '../../filter/FilterValueType'
import * as nft from '../../filter/NumberFilterType'
import VCS_Item from "./VCS_Item";

export const GetItems = (q) => {
  var list = [];

  // < 80
  var item = new VCS_Item();
  item.Color = '#1956c9';

  var filter = new EntFilter();
  filter.ValueType = fvt.bynumber;
  filter.NumberFilterType = nft.bysmaller;
  filter.Values = [ 0.80 ];
  item.Filter = filter;

  list.push(item);

  // 80 -85
  item = new VCS_Item();
  item.Color = '#3f79d6';

  filter = new EntFilter();
  filter.ValueType = fvt.bynumber;
  filter.NumberFilterType = nft.bybetween;
  filter.IsEqualLeft = true;
  filter.Values = [ 0.80, 0.85 ];
  item.Filter = filter;

  list.push(item);

   // 85 -90
   item = new VCS_Item();
   item.Color = '#6f9fe9';
 
   filter = new EntFilter();
   filter.ValueType = fvt.bynumber;
   filter.NumberFilterType = nft.bybetween;
   filter.IsEqualLeft = true;
   filter.Values = [ 0.85, 0.90 ];
   item.Filter = filter;
 
   list.push(item);

   // 90 -95
   item = new VCS_Item();
   item.Color = '#a5c2f2';
 
   filter = new EntFilter();
   filter.ValueType = fvt.bynumber;
   filter.NumberFilterType = nft.bybetween;
   filter.IsEqualLeft = true;
   filter.Values = [ 0.9, 0.95 ];
   item.Filter = filter;
 
   list.push(item);

   // 95 -100
   item = new VCS_Item();
   item.Color = '#c9d9f6';
 
   filter = new EntFilter();
   filter.ValueType = fvt.bynumber;
   filter.NumberFilterType = nft.bybetween;
   filter.IsEqualLeft = true;
   filter.Values = [ 0.95, 1 ];
   item.Filter = filter;
 
   list.push(item);

   // 100 -105
   item = new VCS_Item();
   item.Color = '#f3cccc';
 
   filter = new EntFilter();
   filter.ValueType = fvt.bynumber;
   filter.NumberFilterType = nft.bybetween;
   filter.IsEqualRight = true;
   filter.Values = [ 1, 1.05 ];
   item.Filter = filter;
 
   list.push(item);

   // 105 -110
   item = new VCS_Item();
   item.Color = '#e9999a';
 
   filter = new EntFilter();
   filter.ValueType = fvt.bynumber;
   filter.NumberFilterType = nft.bybetween;
   filter.IsEqualRight = true;
   filter.Values = [ 1.05, 1.10 ];
   item.Filter = filter;
 
   list.push(item);

    // 110 -115
    item = new VCS_Item();
    item.Color = '#de6568';
  
    filter = new EntFilter();
    filter.ValueType = fvt.bynumber;
    filter.NumberFilterType = nft.bybetween;
    filter.IsEqualRight = true;
    filter.Values = [ 1.10, 1.15 ];
    item.Filter = filter;
  
    list.push(item);

    // 110 -115
    item = new VCS_Item();
    item.Color = '#c90010';
  
    filter = new EntFilter();
    filter.ValueType = fvt.bynumber;
    filter.NumberFilterType = nft.bybetween;
    filter.IsEqualRight = true;
    filter.Values = [ 1.15, 1.20 ];
    item.Filter = filter;
  
    list.push(item);

    // 115 -120
    item = new VCS_Item();
    item.Color = '#980009';
  
    filter = new EntFilter();
    filter.ValueType = fvt.bynumber;
    filter.NumberFilterType = nft.bybigger;
    filter.Values = [ 1.20 ];
    item.Filter = filter;
  
    list.push(item);

    return list;
}