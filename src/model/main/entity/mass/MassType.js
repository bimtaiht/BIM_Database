export const concrete = "concrete";
export const formwork = "formwork";
export const rebar = "rebar";

export const GetAll = () => {
  return [ concrete, formwork, rebar ];
}

export const IsGetElement = (massType) => {
  return massType === concrete || massType === formwork;
}