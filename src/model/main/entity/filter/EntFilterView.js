import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import { EntFilterVM } from "./EntFilterVM";
import SelectView from "../../../select/SelectView";
import { MultiSelectVM } from "../../../select/MultiSelectVM";
import MultiSelectView from "../../../select/MultiSelectView";

const { Option } = Select;

class EntFilterView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new EntFilterVM();
    } else {
      this.state = store;
    }
  }

  test = () => {
    console.log("test button");
  }

  onValueChange = (v) => {
    var data = this.state;
    var items = data.ItemVMs;
    var wp = data.CurrentItemVM = items[v];
  }

  render() {
    var data = this.state;

    return (
      <>
        <div>
          <SelectView store={data.ValueTypeSelectVM} />
        </div>
        <div>
          <SelectView store={data.StringFilterTypeSelectVM} />
        </div>
        <div>
          <MultiSelectView store={data.ValuesSelectVM} />
        </div>
      </>
    )
  }
}

export default observer(EntFilterView)