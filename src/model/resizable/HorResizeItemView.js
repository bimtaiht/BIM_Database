import { Resizable } from 're-resizable';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';

const style = {
  border: "solid 1px #ddd",
  //background: "#f0f0f0"
}

class HorResizeItemView extends Component {
  constructor(props) {
    super(props)
    this.itemRef = React.createRef()
  }

  getSize = () => {
    var item = this.props.store;
    var { widthPercent, height } = item;
    return {
      width: `${widthPercent}%`,
      height: height
    }
  }

  getDeltaPercent = (lastPercent, dw, currentWidth) => {
    return dw / (currentWidth - dw) * lastPercent;
  }

  getNewPercent = (lastPercent, dw, currentWidth) => {
    return lastPercent
      + this.getDeltaPercent(lastPercent, dw, currentWidth);
  }

  onResizeStop = (e, dir, ref, d) => {
    var item = this.props.store;
    var wp = item.widthPercent;
    var currentWidth = this.itemRef.current.size.width;
    var dw = d.width;
    var dp = this.getDeltaPercent(wp, dw, currentWidth);
    item.offsetWidthPercent(dp);
  }

  onClick = () => {
    var item = this.props.store;
    console.log(item.getIndex());
  }

  getWrapperContent = () => {
    var { wrapper } = this.props.store;
    if (!wrapper) return '';
    return wrapper;
  }

  render() {
    var item = this.props.store;

    return (
      <>
        <Resizable
          ref={this.itemRef}
          style={style}
          size={this.getSize()}
          minWidth='150'
          maxWidth='90%'
          enable={item.getEnable()}
          onResizeStop={this.onResizeStop}
          onResize={this.onResize}
        >
          {this.getWrapperContent()}
        </Resizable>
      </>
    );
  }
}

export default observer(HorResizeItemView);
