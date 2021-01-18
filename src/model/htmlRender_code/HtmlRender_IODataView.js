import React, { Component } from 'react';
import { observer } from 'mobx-react';
import HorResizeDictView from '../resizable/HorResizeDictView';
import HtmlRender_IODataVM from './HtmlRender_IODataVM';

class HtmlRender_IODataView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new HtmlRender_IODataVM();
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

export default observer(HtmlRender_IODataView);
