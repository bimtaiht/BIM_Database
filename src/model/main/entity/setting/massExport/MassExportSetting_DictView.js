import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import InputView from "../../../../input/InputView";
import CheckboxView from "../../../../checkbox/CheckboxView";
import { MassExportSetting_DictVM } from "./MassExportSetting_DictVM";
import SelectView from "../../../../select/SelectView";
import MassExportSettingDataView from "./MassExportSettingDataView";

const { Option } = Select;

class MassExportSetting_DictView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MassExportSetting_DictVM();
    } else {
      this.state = store;
    }
  }

  onValueChange = (v) => {
    var data = this.state;
    var items = data.Items;
    var wp = data.CurrentItem = items[v];
  }

  render() {
    var data = this.state;

    var items = data.Items;
    var elems = items ? items.map((item, index) => {
      var searchName = item.SearchName;
      return <Option key={index} value={index}>{searchName}</Option>
    }) : "";

    var input = data.Input;

    return (
      <>
        <Divider orientation="left" plain>
          <b>Thiết lập xuất khối lượng</b>
        </Divider>

        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="search thiết lập"
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
          <InputView store={input.NameVM} />
          <InputView store={input.DescriptionVM} />

          <MassExportSettingDataView store={input.DataVM} />

          <div>
            <CheckboxView store={input.IsNewVM} />
            <Button style={{ margin: 10 }}
              onClick={input.AddDatabase}>{input.CommandVM.Content}</Button>
            {input.DeleteView}
          </div>
        </div>
      </>
    )
  }
}

export default observer(MassExportSetting_DictView)