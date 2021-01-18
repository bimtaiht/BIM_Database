import * as api from '../../../../../util/apiUtil'
import { PMData } from '../../../single/model/PMData';
import MassItem from './MassItem';
import * as elementUtil from '../../element/ElementUtil'
import * as mt from '../MassType'

export const pmData = () => {
  return PMData.Instance;
}

export const get = (q, isGetElement = false) => {
  var qI = new MassItem();

  qI._id = q._id;
  qI.Value = q.value;
  qI.Unit = q.unit;
  qI.MassType = q.massType;
  qI.Info = q.info;
  qI.projectId = q.projectId;
  qI.workpackageId = q.workpackageId;
  qI.exportSetVersionId = q.exportSetVersionId;

  if (isGetElement && q.elementId) {
    elementUtil.GetById(q.elementId, (data) => {
      qI.Element = data
      qI.GetElementDone = true;
    });
  }

  return qI;
}

export const GetProject = (q) => {
  var list = pmData().Project_Dict.Items;
  var { projectId } = q;
  var index = list.findIndex(x => x._id === projectId);
  return index !== -1 ? list[index] : undefined;
}

export const GetWorkpackage = (q) => {
  var list = pmData().Workpackage_Dict.Workpackages;
  var { workpackageId } = q;
  var index = list.findIndex(x => x._id === workpackageId);
  return index !== -1 ? list[index] : undefined;
}

export const GetPhases = (q) => {
  var list = [];
  var phases = pmData().Phase_Dict.Items;
  var exportSetVersionId = q.exportSetVersionId;
  phases.forEach(x => {
    if (x.exportSetVersionIds.includes(exportSetVersionId)){
      list.push(x);
    }
  })
  return list;
}

export const GetValidPhasesByInput = (q) => {
  var inputPhases = pmData().MassResultComp.Phases;
  var phases = q.Phases;
  var list = [];
  phases.forEach(x => {
    if (inputPhases.includes(x)){
      list.push(x);
    }
  })
  return list;
}

export const getAll = (apiData, handle) => {
  var url = "https://api.bimdev.vn/api/hbmr/list";
  api.post(url, apiData).then(response => response.data)
    .then(data => {
      var items = data.map(x => get(x))
      if (handle) {
        handle(items);
      }
    });
}

export const getByViewDetail = (_id, handle) => {
  var url = `https://api.bimdev.vn/api/hbdv/massdetail?id=${_id}`;
  api.get(url).then(response => response.data)
    .then(data => {
      var {viewDetail, masses} = data;
      var isGetElement = mt.IsGetElement(viewDetail.massType);
      var items = masses.map(x => get(x, isGetElement));
      if (handle) {
        handle(items);
      }
    });
}