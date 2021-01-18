import { SettingVM } from "../base/SettingVM";

export default class MassExportSettingVM extends SettingVM {
  OnInitialSetDataVM = (v) => {
    var valueSettingVMs = v.ValueSettingVMs;
  }
}