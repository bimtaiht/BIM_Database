import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import InputView from "../../../input/InputView";
import { Workpackage_DictVM } from "./Workpackage_DictVM";
import CheckboxView from "../../../checkbox/CheckboxView";
import SelectView from "../../../select/SelectView";

const { Option } = Select;

class Workpackage_DictView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new Workpackage_DictVM();
    } else {
      this.state = store;
    }
  }

  onValueChange = (v) => {
    var data = this.state;
    var wps = data.WorkpackageVMs;
    var wp = data.CurrentWorkpackageVM = wps[v];
  }

  render() {
    var data = this.state;
    var wps = data.WorkpackageVMs;

    var elems = wps ? wps.map((item, index) => {
      var searchName = item.SearchName;
      return <Option key={index} value={index}>{searchName}</Option>
    }) : "";

    var inputVM = data.WorkpackageInputVM;
    var commandVM = inputVM.CommandVM;

    return (
      <>
        <Divider orientation="left" plain>
          <b>Công tác</b>
        </Divider>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="search công tác"
          optionFilterProp="children"
          onChange={this.onValueChange}
          value={null}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {elems}
        </Select>

        <div style={{ marginTop: 20 }}>
          <InputView store={inputVM.CodeVM} />
          <InputView store={inputVM.NameVM} />
          <InputView store={inputVM.DescriptionVM} />
          <SelectView store={inputVM.SupItemSelectVM} />
          <div>
            <CheckboxView store={inputVM.IsNewVM} />
            <Button style={{ margin: 10 }}
              onClick={inputVM.AddDatabase}>{commandVM.Content}</Button>
            {inputVM.DeleteView}
          </div>
        </div>
      </>
    )
  }
}

export default observer(Workpackage_DictView)