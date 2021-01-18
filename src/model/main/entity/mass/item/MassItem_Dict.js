import MassTable from "../table/MassTable";

export default class MassItem_Dict {
  items
  get Items() {
    return this.items;
  }
  set Items(v) {
    this.items = v;
    this.MassTable.Items = v;
  }

  inputWorkpackages
  get InputWorkpackages(){
    return this.inputWorkpackages;
  }
  set InputWorkpackages(v){
    this.inputWorkpackages = v;
    this.MassTable.InputWorkpackages = v;
  }

  massTable
  get MassTable() {
    if (!this.massTable) {
      this.massTable = new MassTable();
    }
    return this.massTable;
  }
}