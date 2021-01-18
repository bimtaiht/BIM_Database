import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import { Phase_DictVM } from "./Phase_DictVM";
import InputView from "../../../input/InputView";
import * as stateType from '../state/StateType'

const { Option } = Select;

class Phase_DictView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new Phase_DictVM();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;
    var input = data.Input;
    var state = data.State;

    return (
      <>
        <Divider orientation="left" plain>
          <b>Phiên bản khối lượng</b>
        </Divider>
        <div>
          <Button type='primary' size='middle' onClick={data.AddVersion}
            disabled={state === stateType.addversion}>
            <PlusCircleOutlined /> LƯU KẾT QUẢ HIỆN TẠI
          </Button>

          {state === stateType.addversion ? <div className="mt-3">
            <InputView store={input.NameVM} />
            <InputView store={input.DescriptionVM} />
            <div className="mt-2">
              <Button type='primary' size='small' onClick={data.OK}>OK</Button>
              <Button type='default' size='small' onClick={data.Cancel}>Cancel</Button>
            </div>
          </div> : ''}
        </div>
      </>
    )
  }
}

export default observer(Phase_DictView)