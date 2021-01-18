import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import InputView from "../../../../../input/InputView";
import EntFilterView from "../../../filter/EntFilterView";
import CheckboxView from "../../../../../checkbox/CheckboxView";
import MES_ValueSettingVM from "./MES_ValueSettingVM";
import SelectView from "../../../../../select/SelectView";
import * as floatItemVMUtil from "../../../../../float/FloatItemVMUtil";
import FloatItemView from "../../../../../float/FloatItemView";
import { CloseCircleFilled } from "@ant-design/icons";

const { Option } = Select;

class MES_ValueSettingView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MES_ValueSettingVM();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    var floatItemStore = floatItemVMUtil.get('top right')
    floatItemStore.wrapper = <Button size='small' type='primary' 
      onClick={data.Delete}>x</Button>

    return (
      <>
        <div style={{ padding: '10px 35px 10px 10px', margin: '8px auto', border: 'solid 0.5px', borderRadius: '10px', position:'relative' }}>
          <FloatItemView store={floatItemStore} />
          <SelectView store={data.RetrieveTypeSelectVM} />
          <SelectView store={data.MassTypeSelectVM} />
          <EntFilterView store={data.ValueFilterVM} />
          <SelectView store={data.WorkpackageSelectVM} />
        </div>
      </>
    )
  }
}

export default observer(MES_ValueSettingView)