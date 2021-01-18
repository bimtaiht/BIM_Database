import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { CompVM1 } from "./CompVM1";
import { Button } from "antd";
import FloatItemView from "../../float/FloatItemView";
import * as floatItemVMUtil from '../../float/FloatItemVMUtil'

class CompView1 extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new CompVM1();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    return (
      <>
        <div style={{ position: 'relative' }}>
          {data.getItemView()}
          {data.getWrapper()}
        </div>
      </>
    )
  }
}

export default observer(CompView1)