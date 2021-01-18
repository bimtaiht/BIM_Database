import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Col, Divider, Input, Row, Select } from "antd";
import InputView from "../../../../input/InputView";
import CheckboxView from "../../../../checkbox/CheckboxView";
import TextView from "../../../../text/TextView";
import MassRow from "./MassRow";
import MassCellView from "./MassCellView";

const { Option } = Select;

class MassRowView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MassRow();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;
    var table = data.Dict;
    var columns = table.Columns;

    var subElems = data.IsShowSub ? data.SubItems.map((x, i) => {
      return <MassRowView store={x} key={x.id} />
    }) : ''

    var toggleButton = data.IsHaveSub ?
      <Button size='small' style={{ marginRight: 5, minWidth:25 }} type='primary'
        onClick={data.ToggleSub}>
        <TextView store={data.ToggleButtonContentVM} />
      </Button>
      : <div style={{ padding: '0 15.5px' }} />;

    return (
      <>
        <tr>
          <th scope="row" >
            <div style={data.Style}>
              {toggleButton}
              {data.Name}
            </div>
          </th>
          {columns.map((y, j) => {
            var cell = table.GetCell(y, data);
            return <MassCellView key={cell.id} store={cell}/>
          })}
        </tr>
        {subElems}
      </>
    )
  }
}

export default observer(MassRowView)