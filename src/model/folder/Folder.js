import * as util from './FolderUtil'
import * as fileUtil from '../file/FileUtil'

export default class Folder {
  name
  supItem
  subItems = []
  group
  files = []

  rank
  getRank = () => {
    if (!this.rank) {
      var rank = 0;

      var { supItem } = this;
      while (supItem) {
        rank++;
        supItem = supItem.supItem;
      }
      this.rank = rank;
    }
    return this.rank;
  }

  getIndex = () => {
    return this.supItem.subItems.indexOf(this);
  }

  delete = () => {
    var index = this.getIndex();
    var { supItem } = this;
    supItem.subItems.splice(index, 1);
  }

  addSub = (name) => {
    if (!name) {
      name = "new folder";
    }
    var item = util.getForSub(name, this);
    var { subItems } = this;
    subItems.push(item);
    return item;
  }

  addFile = (name) => {
    if (!name){
      name = "new file";
    }
    var item = fileUtil.add(name, this);
    this.files.push(item);
    return item;
  }
}