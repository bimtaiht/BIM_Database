import * as api from '../../../../util/apiUtil'
import Phase from './Phase';

export const get = (q, dict) => {
  if (!q) return undefined;

  var qI = new Phase();

  qI._id = q._id;
  qI.Name = q.name;
  qI.Description = q.description;
  qI.Dict = dict;

  GetExportSetVersionData(q._id, (data) => {
    qI.ExportSetVersions = data;
    qI.GetExportSetVersions = true;
  })

  return qI;
}

export const getByProject = (projectId, handle) => {
  var url = `https://api.bimdev.vn/api/hbphase/list?projectId=${projectId}`;
  api.get(url).then(response => response.data)
    .then(data => {
      if (handle) {
        handle(data);
      }
    });
}

export const GetExportSetVersionData = (phaseId, handle) => {
  var url = `https://api.bimdev.vn/api/hbesv/byphase?phaseId=${phaseId}`;
  api.get(url).then(response => response.data)
    .then(data => {
      if (handle) {
        handle(data);
      }
    });
}