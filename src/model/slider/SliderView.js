
import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { SliderVM } from "./SliderVM";

class SliderView extends Component {
  constructor(props) {
    super(props);
    this.itemRef = React.createRef()

    var { store } = this.props;
    if (!store) {
      this.state = new SliderVM();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    return (
      <>
        <div style={{ position: 'relative' }}>
          <div style={{marginLeft:50}}>
            {data.getHtmlRenderView()}
          </div>
          {data.getWrapper()}
        </div>
      </>
    )
  }
}

export default observer(SliderView)