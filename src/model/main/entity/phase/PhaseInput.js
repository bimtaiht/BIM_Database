export default class PhaseInput {
  get ApiData(){
    var projectId = this.Dict.Dict._id;
    var name = this.Name;
    var description = this.Description;

    return {
      projectId, name, description
    }
  }
}