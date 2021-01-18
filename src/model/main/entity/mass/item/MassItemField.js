export const Project = 'Project'
export const Phase = 'Phase'
export const Workpackage = 'Workpackage'
export const Value = 'Value'
export const Unit = 'Unit'
export const partition = 'partition'
export const rebarType = 'rebarType'
export const elementName = 'elementName'

export const GetDirectiveFields = () => {
  return [Project, Workpackage, Value, Unit];
}

export const GetIdentifyFields = () => {
  return [elementName];
}

export const GetValueString = (massFieldValue, field) => {
  switch (field) {
    case Project:
    case Phase:
      return massFieldValue.Name;
    case Workpackage:
      return massFieldValue.FullName;
    default:
      return massFieldValue;
  }
}