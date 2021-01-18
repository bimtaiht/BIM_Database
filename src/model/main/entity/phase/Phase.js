
export default class Phase {
  exportSetVersions
  get ExportSetVersions(){
    return this.exportSetVersions;
  }
  set ExportSetVersions(v){
    this.exportSetVersions = v;
    this.exportSetVersionIds = v.map(x => x._id);
  }

  OnGetExportSetVersions_Func = [];

  set GetExportSetVersions(v){
    this.OnGetExportSetVersions_Func.forEach(x => x());
  }

  exportSetVersionIds
}