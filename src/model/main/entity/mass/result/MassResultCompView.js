import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import MassResultCompVM from "./MassResultCompVM";
import MultiSelectView from '../../../../select/MultiSelectView'
import MassTableView from "../table/MassTableView";
import CheckboxView from "../../../../checkbox/CheckboxView";

const { Option } = Select;

class MassResultCompView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MassResultCompVM();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    return (
      <>
        <Divider orientation="left" plain>
          <b>Thông tin khối lượng</b>
        </Divider>
        {data.IsShowProjectSelect ?
          <MultiSelectView store={data.ProjectSelectVM} /> : ''}
        <div style={{ marginTop: 10 }}>
          <MultiSelectView store={data.WorkpackageSelectVM} />
        </div>

        {data.CanHavePhase ?
          <>
            <Divider orientation="left" plain>
              <CheckboxView store={data.IsShowPhaseSelectVM} />
            </Divider>
            {data.IsHavePhase ?
              <MultiSelectView store={data.PhaseSelectVM} /> : ''}
          </>
          : ''
        }

        <Button style={{ marginTop: 8 }} onClick={data.GetMassData}
          size='middle' type='primary'>GET DATA</Button>
        <div style={{ marginTop: 15 }}>
          <MassTableView store={data.MassItem_Dict.MassTable} />
        </div>
      </>
    )
  }
}

export default observer(MassResultCompView)