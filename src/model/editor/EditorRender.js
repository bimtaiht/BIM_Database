export default class EditorRender {
  content
  getContent = () => {
    if (!this.content){
      this.content = 'Nội dung soạn thảo'
    }
    return this.content
  }
}