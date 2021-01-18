import React, { Component } from 'react';
import { observer } from 'mobx-react';
import HorResizeDictView from '../../resizable/HorResizeDictView';
import TA_HR_IDVM from './TA_HR_IDVM';

class TA_HR_IDView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new TA_HR_IDVM();
    }else{
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    return (
      <>
        <HorResizeDictView store={data.getResizeDictVM()} />
      </>
    );
  }
}

export default observer(TA_HR_IDView);
