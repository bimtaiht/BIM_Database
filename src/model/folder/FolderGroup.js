import * as folderUtil from './FolderUtil'

export default class FolderGroup {
  items = []

  mainFolder
  getMainFolder = () => {
    if (!this.mainFolder){
      this.mainFolder = folderUtil.getForMain('Main', this);
    }
    return this.mainFolder;
  }
}