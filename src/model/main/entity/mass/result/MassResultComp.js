import MassItem_Dict from '../item/MassItem_Dict';
import * as util from './MassResultCompUtil'
import * as massItemUtil from '../item/MassItemUtil'
import { PMData } from '../../../single/model/PMData';
import * as mif from '../item/MassItemField'

export const pmData = () => {
  return PMData.Instance;
}

export default class MassResultComp {
  Projects = []

  Workpackages = []

  Phases = []

  get ApiData() {
    return util.GetApiData(this);
  }

  massItem_Dict
  get MassItem_Dict(){
    if (!this.massItem_Dict){
      this.massItem_Dict = new MassItem_Dict();
    }
    return this.massItem_Dict;
  }

  OnGetItemsDone_Funcs = []

  set GetItemsDone (v){
    this.OnGetItemsDone_Funcs.forEach(x => x());
  }

  isHavePhase = false
  get IsHavePhase(){
    return this.isHavePhase;
  }
  set IsHavePhase(v){
    this.isHavePhase = v;
    if (v){
    this.MassItem_Dict.MassTable.ColumnField = mif.Phase
    }else{
      this.MassItem_Dict.MassTable.ColumnField = mif.Project
    }
  }

  GetRefinedWorkpackages = (wps) => {
    var list = [];
    wps.forEach((x,i,a) => {
      var l2 = a.filter(y => y !== x && y.LowerList.includes(x));
      if (l2.length === 0){
        list.push(x);
      }
    })
    return list;
  }

  // function
  GetMassData = () => {
    //console.log(this.ApiData); return;
    
    var wp_Dict = pmData().Workpackage_Dict;
    if (wp_Dict.IsDataChanged){
      wp_Dict.RefreshData();
    }

    this.Workpackages = this.GetRefinedWorkpackages(this.Workpackages); 

    massItemUtil.getAll(this.ApiData, (items) => {
      this.MassItem_Dict.InputWorkpackages = this.Workpackages;
      this.MassItem_Dict.Items = items;
      this.GetItemsDone = true;
    })
  }
}