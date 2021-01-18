import { Button } from 'antd';
import React, { Component } from 'react';

import HorResizeItemView from './HorResizeItemView';
import HorResizeDictVM from './HorResizeDictVM'

import HorResizeItemVM from './HorResizeItemVM'
import * as itemUtil from './HorResizeItemVMUtil'


const style = {
  height: 300,
  border: "solid 1px #ddd",
  background: "#f0f0f0"
}

class HorResizeDictView extends Component {
  constructor(props) {
    super(props);

    var {store} = this.props;
    if (!store) {
      var dict = this.dataContext = new HorResizeDictVM();
      var items = [
        itemUtil.get(undefined, 30, 300, dict),
        itemUtil.get(undefined, 30, 300, dict),
        itemUtil.get(undefined, 40, 300, dict),
      ];
      dict.items = items;
    } 
  }

  render() {
    var data = this.props.store ? this.props.store : this.dataContext;
    var elems = data.items.map((x, index) => {
      return <HorResizeItemView key={index} store={x} />
    })

    return (
      <>
        <div style={{ display: 'flex' }}>
          {elems}
        </div>
      </>
    );
  }
}

export default HorResizeDictView;
