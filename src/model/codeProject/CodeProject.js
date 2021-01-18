import FolderGroup from "../folder/FolderGroup"

export default class CodeProject {
  folderGroup
  getFolderGroup= () => {
    if (!this.folderGroup){
      this.folderGroup = new FolderGroup();
    }
    return this.folderGroup;
  }
}