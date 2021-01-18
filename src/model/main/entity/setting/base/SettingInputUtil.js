import * as st from './SettingType'

export const GetUrlPrefix = (q) => {
  var prefix = undefined
  switch (q.SettingType) {
    case st.elementfilter:
      prefix = 'ef';
      break;
    case st.massexport:
      prefix = 'me';
      break;
    case st.massgroup:
      prefix = 'mg';
      break;
  }
  return prefix;
}