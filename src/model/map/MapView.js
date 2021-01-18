
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { MapVM } from './MapVM';
import * as floatItemVMUtil from '../float/FloatItemVMUtil'
import { Button } from 'antd';
import FloatItemView from '../float/FloatItemView';

class MapView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      var obj = this.state = new MapVM();

      // Wrapper
      var floatItemStore = floatItemVMUtil.get('top right');
      var addItem = () => {
        obj.addItem()
      }
      floatItemStore.wrapper = <Button onClick={addItem}>Add</Button>
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
        <div style={{ widht: '50%', height: 500, background: '#f0f0f0', position: 'relative' }}>
          {data.getReactElements()}
          {this.getWrapperContent()}
        </div>
      </>
    );
  }
}

export default observer(MapView);
