import MassRow from "./MassRow";

export const get = (q, dict) => {
  var qI = new MassRow();
  qI.Name = q;
  qI.Dict = dict;
  return qI;
}

export const GetRank = (q) => {
  return q.SupItem ? q.SupItem.Rank +1 : 0;
}

export const GetStyle = (q) => {
  return {
    display: 'flex',
    marginLeft : q.Rank * 20
  }
}

export const GetIsHaveSub = (q) => {
  return q.SubItems.length !== 0;
}

export const GetToggleButtonContent = (q) => {
  return q.IsShowSub ? '-' : '+';
}