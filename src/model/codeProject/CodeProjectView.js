import React, { Component } from 'react';
import { observer } from 'mobx-react';
import HorResizeDictView from '../resizable/HorResizeDictView';
import * as vmUtil from './CodeProjectVMUtil'
import CodeProject from './CodeProject';

class CodeProjectView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = vmUtil.get(new CodeProject())
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

export default observer(CodeProjectView);
