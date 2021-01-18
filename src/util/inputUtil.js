export const get = (inputs, name) => {
  var index = inputs.findIndex(x => x.name === name);
  if (index === -1) {
    inputs.push(getDefaultInput(name));
    index = inputs.length - 1;
  }
  return inputs[index];
}

export const getDefaultInput = (name) => {
  let value;
  switch (name) {
    case '0':
      value = 0;
      break;
    case 'x':
      value = 3;
      break;
    case 'class':
      value = 'Person';
      break;
    case 'classDesc':
      value = 'Kiểu dữ liệu mô phỏng ...';
      break;
    default:
      value = 'undefined';
      break;
  }

  return { name, value }
}