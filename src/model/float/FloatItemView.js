import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as floatItemVMUtil from './FloatItemVMUtil'

class FloatItemView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = floatItemVMUtil.get('top right', 'Test')
    }else{
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
        <span className={data.getClassName()}>{this.getWrapperContent()}</span>
      </>
    );
  }
}

export default observer(FloatItemView);
