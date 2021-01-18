import * as itemUtil from './ProjectUtil'

export class Project_Dict {
  constructor(){
    itemUtil.getAll(this, (items) => {
      this.Items = items;
      this.GetItemsDone = true;
    })
  }

  Items

  set GetItemsDone (v){
    if (this.OnGetItemsDone){
      this.OnGetItemsDone(v);
    }
  }
}