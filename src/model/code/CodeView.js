import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as util from './CodeUtil'
import * as vmutil from './CodeVMUtil'
import Code from './Code';
import { Button } from 'antd';
import HorResizeDictView from '../resizable/HorResizeDictView';

class CodeView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      var codeString = `var x = 3`
      var code = util.get(codeString);
      this.state = vmutil.get(code);
    }else{
      this.state = store;
    }
  }

  render()  {
    var data = this.state;

    return (
      <>
        <HorResizeDictView store={data.getResizeDictVM()} />
      </>
    );
  }
}

export default observer(CodeView);
