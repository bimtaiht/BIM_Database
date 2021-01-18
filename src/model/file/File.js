import { values } from "mobx"

export default class File {
  name
  folder

  content
  getContent= () => {
    if (!this.content){
      this.content = 'Nội dung file'
    }
    return this.content;
  }
  setContent = (value) => {
    this.content = value;
  }

  rank
  getRank = () =>{
    if (!this.rank){
      this.rank = this.folder.getRank() + 1;
    }
    return this.rank;
  }

  group
  getGroup = () => {
    if (!this.group){
      this.group = this.folder.getGroup();
    }
    return this.group;
  }

  getIndex = () => {
    return this.folder.files.indexOf(this);
  }

  delete = () => {
    var index = this.getIndex();
    var { folder } = this;
    folder.files.splice(index, 1);
  }
}