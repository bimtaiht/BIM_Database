import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Col, Divider, Input, Row, Select } from "antd";
import InputView from "../../../../input/InputView";
import CheckboxView from "../../../../checkbox/CheckboxView";
import TextView from "../../../../text/TextView";
import MassCell from "./MassCell";

const { Option } = Select;

class MassCellView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MassCell();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    return (
      <>
        <td className='text-right' style={data.TDStyle}>
          <a style={data.AStyle}
            onClick={data.ShowDetail}>
            <TextView store={data.ContentVM} />
          </a>
        </td>
      </>
    )
  }
}

export default observer(MassCellView)