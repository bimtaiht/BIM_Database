
export let dtFormat = new Intl.DateTimeFormat('en-GB');

export const deepClone = (q) => {
  return JSON.parse(JSON.stringify(q));
}

export const randomId = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 9);
};

export const UpdateFromModel = (obj, action) => {
  obj.M2VM = true;
  action();
  obj.M2VM = false;
}