import { SettingVM } from "../base/SettingVM";

export default class ElementFilterSettingVM extends SettingVM {
  OnInitialSetDataVM = (v) => {
    var cateFilterVM = v.CategoryFilterVM;
    if (cateFilterVM) {
      cateFilterVM.OnInitialData();
    }

    var famFilterVM = v.FamilyFilterVM;
    if (famFilterVM) {
      famFilterVM.OnInitialData();
    }
  }
}