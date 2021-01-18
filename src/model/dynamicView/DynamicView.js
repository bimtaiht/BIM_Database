import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';

import * as viewType from '../../constant/viewType'
import DynamicVM from './DynamicVM';
import CodeView from '../code/CodeView';

import TextView from '../text/TextView';
import * as textUtil from '../text/TextVMUtil';
import * as codeUtil from '../code/CodeUtil'
import * as codeVMUtil from '../code/CodeVMUtil'

class DynamicView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      var item = this.state = new DynamicVM();

      var inputs = item.getInputs();
      inputs[viewType.TEXTVIEW] = textUtil.get('nội dung của file');
      inputs[viewType.CODEVIEW] = codeVMUtil.get(codeUtil.get('var x = x * 4'));

      item.currentViewType = viewType.CODEVIEW
    } else {
      this.state = store;
    }
  }

  getItemView = () => {
    var data = this.state;
    var { currentViewType } = data;
    if (currentViewType === viewType.CODEVIEW) {
      return <CodeView store={data.inputs[currentViewType]} />
    } else {
      return <TextView store={data.inputs[currentViewType]} />
    }
  }

  getWrapperContent = () => {
    var { wrapper } = this.state;
    if (!wrapper) return '';
    return wrapper;
  }

  render() {
    return (
      <>
        {this.getItemView()}
        {this.getWrapperContent()}
      </>
    );
  }
}

export default observer(DynamicView);
