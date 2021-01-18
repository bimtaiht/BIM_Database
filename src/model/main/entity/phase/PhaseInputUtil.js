import PhaseInput from './PhaseInput';

export const get = (dict) => {
  var qI = new PhaseInput();
  qI.Dict = dict;
  qI.Name = 'Version 1';
  qI.Description = 'mô tả phiên bản';

  return qI;
}