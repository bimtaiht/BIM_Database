import React, { Component } from 'react';
import { observer } from 'mobx-react';
import HorResizeDictView from '../resizable/HorResizeDictView';
import * as editorRenderVMUtil from './EditorRenderVMUtil'
import EditorRender from './EditorRender';

class CodeProjectView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = editorRenderVMUtil.get(new EditorRender())
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
