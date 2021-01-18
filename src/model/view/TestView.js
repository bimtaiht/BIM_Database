import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PMDataView from '../main/single/form/PMDataView';
import { Col, Row } from 'antd';

class TestView extends Component {
  render() {
    return (
      <>
        <PMDataView />
      </>
    );
  }
}

export default observer(TestView);
