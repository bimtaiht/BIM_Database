import * as util from './CategoryDataUtil'

export class CategoryData {
  constructor() {
    
  }

  static instance
  static get Instance(){
    if (!this.instance){
      this.instance = new CategoryData();
    }
    return this.instance;
  }

  categoryNames;
  get CategoryNames() {
    if (!this.categoryNames){
      this.categoryNames = util.GetCategoryNames();
    }
    return this.categoryNames;
  }
}