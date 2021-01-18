import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import InputView from "../../../../input/InputView";
import ElementFilterSettingDataVM from "./ElementFilterSettingDataVM";
import EntFilterView from "../../filter/EntFilterView";
import CheckboxView from "../../../../checkbox/CheckboxView";

const { Option } = Select;

class ElementFilterSettingDataView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new ElementFilterSettingDataVM();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;
    var { IsHaveFamilyFilter } = data;

    return (
      <>
        <Divider orientation="left" plain>
          Thiết lập lọc Category
        </Divider>
        <EntFilterView store={data.CategoryFilterVM} />

        <Divider orientation="left" plain>
          {/* Thiết lập lọc Family */}
          <CheckboxView store={data.IsHaveFamilyFilterVM}/>
        </Divider>
        {IsHaveFamilyFilter? <EntFilterView store={data.FamilyFilterVM} /> : ""}
      </>
    )
  }
}

export default observer(ElementFilterSettingDataView)