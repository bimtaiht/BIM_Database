
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import InputView from '../input/InputView';

class MapItemView extends Component {
  constructor(props) {
    super(props);
    var { store } = this.props;
    if (!store) {

    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    return (
      <>
        <div style={data.getStyle()}>
          {data.wrapper ? data.wrapper : ''}
          {data.canEdit ? <Button size='small' type='ghost' onClick={data.toggleInput}>Edit</Button> : ''}
          {data.getShowInputView()}
        </div>
      </>
    )
  }
}

export default observer(MapItemView);
