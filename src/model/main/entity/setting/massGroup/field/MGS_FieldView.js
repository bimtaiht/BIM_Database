import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import InputView from "../../../../../input/InputView";
import CheckboxView from "../../../../../checkbox/CheckboxView";
import SelectView from "../../../../../select/SelectView";
import { CloseCircleFilled } from "@ant-design/icons";
import * as floatItemVMUtil from "../../../../../float/FloatItemVMUtil";
import FloatItemView from "../../../../../float/FloatItemView";
import MGS_FieldVM from "./MGS_FieldVM";

const { Option } = Select;

class MGS_FieldView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MGS_FieldVM();
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
        <div style={{ padding: '0px 35px 0px 10px', margin: '3px auto', position: 'relative' }}>
          <FloatItemView store={floatItemStore} />
          <SelectView store={data.FieldSelectVM} />
        </div>
      </>
    )
  }
}

export default observer(MGS_FieldView)