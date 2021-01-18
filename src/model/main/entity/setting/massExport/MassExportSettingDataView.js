import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import InputView from "../../../../input/InputView";
import EntFilterView from "../../filter/EntFilterView";
import CheckboxView from "../../../../checkbox/CheckboxView";
import MassExportSettingDataVM from "./MassExportSettingDataVM";
import SelectView from "../../../../select/SelectView";
import MES_ValueSettingView from "./exportSetting/MES_ValueSettingView";

const { Option } = Select;

class MassExportSettingDataView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MassExportSettingDataVM();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    var valueSettingElems = data.ValueSettingVMs.map((x, i) => {
      return <MES_ValueSettingView key={i} store={x} />
    })

    return (
      <>
        <SelectView store={data.ElementFilterSelectVM} />
        <Divider orientation="left" plain>
          Thiết lập giá trị
          <Button type='primary' size='small' onClick={data.AddNewValueSettingVM}
            style={{marginLeft:15}}>+</Button>
        </Divider>
        {valueSettingElems}
      </>
    )
  }
}

export default observer(MassExportSettingDataView)