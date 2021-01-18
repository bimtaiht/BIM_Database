import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import InputView from "../../../../input/InputView";
import CheckboxView from "../../../../checkbox/CheckboxView";
import SelectView from "../../../../select/SelectView";
import MassGroupSettingDataVM from "./MassGroupSettingDataVM";
import MGS_FieldView from "./field/MGS_FieldView";

const { Option } = Select;

class MassGroupSettingDataView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MassGroupSettingDataVM();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    var fieldElems = data.FieldVMs.map((x, i) => {
      return <MGS_FieldView key={i} store={x} />
    })

    return (
      <>
        <Divider orientation="left" plain>
          Phân cấp thông tin
          <Button type='primary' size='small' onClick={data.AddNewFieldVM}
            style={{marginLeft:15}}>+</Button>
        </Divider>
        {fieldElems}
      </>
    )
  }
}

export default observer(MassGroupSettingDataView)