import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import { ElementFilterSetting_DictVM } from "./ElementFilterSetting_DictVM";
import InputView from "../../../../input/InputView";
import ElementFilterSettingDataView from "./ElementFilterSettingDataView";
import CheckboxView from "../../../../checkbox/CheckboxView";

const { Option } = Select;

class ElementFilterSetting_DictView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new ElementFilterSetting_DictVM();
    } else {
      this.state = store;
    }
  }

  test = () => {
    console.log("test button");
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
          <b>Bộ lọc đối tượng</b>
        </Divider>

        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="search bộ lọc"
          optionFilterProp="children"
          onChange={this.onValueChange}
          value={null}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {elems}
        </Select>

        <div style={{marginTop:20}}>
          <InputView store={input.NameVM} />
          <InputView store={input.DescriptionVM} />

          <ElementFilterSettingDataView store={input.DataVM}/>

          <CheckboxView store={input.IsNewVM} />
          <Button style={{margin:10}}
            onClick={input.AddDatabase}>{input.CommandVM.Content}</Button>
          {input.DeleteView}
        </div>
      </>
    )
  }
}

export default observer(ElementFilterSetting_DictView)