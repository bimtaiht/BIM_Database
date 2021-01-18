import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Select } from "antd";
import { SelectVM } from "./SelectVM";
import * as floatItemVMUtil from '../float/FloatItemVMUtil'
import FloatItemView from "../float/FloatItemView";

const { Option } = Select;

class SelectView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new SelectVM();
    } else {
      this.state = store;
    }
  }

  onValueChange = (v) => {
    var data = this.state;
    data.SelectedIndex = v;
  }

  render() {
    var data = this.state;
    var { Placeholder, Items, SelectedIndex, InitialIndex } = data;

    if (SelectedIndex === -1) {
      SelectedIndex = InitialIndex;
      data.InitialIndex = -1;
    }

    var elems = Items ? Items.map((item, index) => {
      var displayContent = item.DisplayContent ? item.DisplayContent : `${item}`;
      return <Option key={index} value={index}>{displayContent}</Option>
    }) : "";

    var floatElem = ''
    if (data.CanClear) {
      var floatItemStore = floatItemVMUtil.get('right')
      floatItemStore.wrapper = <Button size='small' type='primary'
        onClick={data.Clear}>x</Button>

      floatElem = <FloatItemView store={floatItemStore} />;
    }

    return (
      <>
        <div style={data.DivStyle}>
          {floatElem}
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder={Placeholder}
            optionFilterProp="children"
            onChange={this.onValueChange}
            value={SelectedIndex}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {elems}
          </Select>
        </div>
      </>
    )
  }
}

export default observer(SelectView)