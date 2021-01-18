export const GetApiData = (q) => {
  var workpackageIds = [];

  q.Workpackages.forEach((x, i) => 
    workpackageIds.push.apply(workpackageIds, x.LowerIds));
  workpackageIds= workpackageIds.filter((x, i, a) => a.indexOf(x) === i);

  return {
    projectIds : q.Projects.map(x => x._id),
    workpackageIds,
    phaseIds : q.IsHavePhase ? q.Phases.map(x => x._id) : undefined
  }
}