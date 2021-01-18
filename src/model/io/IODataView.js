import { Component } from "react";
import { observer } from 'mobx-react';
import * as ioDataVMUtil from './IODataVMUtil'
import { Button } from "antd";
import * as floatItemVMUtil from '../float/FloatItemVMUtil'
import FloatItemView from "../float/FloatItemView";

class IODataView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      var inputs = [
        {
          name: 'x', value: 5
        },
        {
          name: 'y', value: 15
        }
      ];

      var obj = this.state = ioDataVMUtil.get(inputs);

      obj.getOutputFunc = () => {
        var inputs = obj.inputs;
        var outputs = [];
        outputs[0] = `x  + y = ${inputs[0].value + inputs[1].value}`;
        return outputs;
      }

      obj.getReactElementsFunc = () => { return obj.getOutputs()[0] };

      var floatItemStore = floatItemVMUtil.get('top right');
      obj.changeData = () => {
        var { inputs } = obj;
        inputs[0].value = inputs[0].value + 1;
        inputs[1].value = inputs[1].value + 2;
      }
      floatItemStore.wrapper = <Button onClick={obj.changeData}>Test</Button>

      obj.wrapper = <FloatItemView store={floatItemStore} />

    } else {
      this.state = store;
    }
  }

  getWrapperContent = () => {
    var { wrapper } = this.state;
    if (!wrapper) return '';
    return wrapper;
  }

  render() {
    var data = this.state;

    return (
      <>
        <div style={data.getStyle()}>
          {data.getReactElements()}
          {this.getWrapperContent()}
        </div>
      </>
    )
  }
}

export default observer(IODataView)