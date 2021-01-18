import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Select } from "antd";
import { MultiSelectVM } from "./MultiSelectVM";

const { Option } = Select;

class MultiSelectView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MultiSelectVM();
    } else {
      this.state = store;
    }
  }

  onValueChange = (v) => {
    var data = this.state;
    data.SelectedIndexs = v;
  } 

  render() {
    var data = this.state;
    var {Placeholder, Items, SelectedIndexs, InitialIndexs} = data;

    if (SelectedIndexs.length === 0){
      SelectedIndexs = InitialIndexs;
      data.InitialIndexs = [];
    }

    var elems = Items ? Items.map((item, index) => {
      var displayContent = item.DisplayContent ? item.DisplayContent : `${item}`;
      return <Option key={index} value={index}>{displayContent}</Option>
    }) : "";

    return (
      <>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder={Placeholder}
          optionFilterProp="children"
          onChange={this.onValueChange}
          value={SelectedIndexs}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {elems}
        </Select>
      </>
    )
  }
}

export default observer(MultiSelectView)