
export default class PhaseVM {
  name
  get Name(){
    if(!this.name){
      this.name = this.ModelItem.Name;
    }
    return this.name;
  }
  set Name(v){
    this.name = v;
    this.ModelItem.Name = v;
  }

  description
  get Description(){
    if (!this.description){
      this.description = this.ModelItem.Description;
    }
    return this.description;
  }
  set Description(v){
    this.description = v;
    this.ModelItem.Description = v;
  }

  get DisplayContent () {
    return `${this.Name}`;
  }
}