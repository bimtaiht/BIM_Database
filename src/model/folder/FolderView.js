import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as util from './FolderUtil'
import * as vmutil from './FolderVMUtil'
import { Button } from 'antd';
import { CaretRightFilled, CloseOutlined, FolderOutlined, PlusCircleFilled, PlusOutlined } from "@ant-design/icons";

class FolderView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      var name = `Tên folder`
      var folder = util.getForMain(name);
      this.dataContext = vmutil.getForMain(folder);
      this.state = vmutil.getForMain(folder);
    } else {
      this.state = store;
    }
  }

  onClick = () => {
    //var data = this.props.store ? this.props.store : this.dataContext;
    var data = this.state;
    var item = data;
    item.setSelected();
  }

  getItemViews = () => {
    //var data = this.props.store ? this.props.store : this.dataContext;
    var data = this.state;
    var item = data;
    var elems = item.getIsOpenSub() ?
      <>
        {item.getSubItemViews()}
        {item.getFileViews()}
      </>
      : ''
    return elems;
  }

  addSub = () => {
    //var data = this.props.store ? this.props.store : this.dataContext;
    var data = this.state;
    var item = data;
    item.addSub();
  }

  addFileView = () => {
    //var data = this.props.store ? this.props.store : this.dataContext;
    var data = this.state;
    var item = data;
    item.addFileView();
  }

  render() {
    //var data = this.props.store ? this.props.store : this.dataContext;
    var data = this.state;
    var item = data;

    return (
      <>
        <div style={item.getStyle()}>
          <div style={item.getMarginStyle()}>
            {item.getToggleIcon()}
            <FolderOutlined />
          </div>
          <div style={{ width: '100%' }}
            onClick={this.onClick}>
            <span>
              {item.getName()}
              <CloseOutlined style={{ marginLeft: 10 }}
                onClick={item.delete} />
              <PlusOutlined style={{ marginLeft: 10 }}
                onClick={this.addSub} />
              <PlusCircleFilled style={{ marginLeft: 10 }}
                onClick={this.addFileView} />
            </span>
          </div>
        </div>
        {this.getItemViews()}
      </>
    );
  }
}

export default observer(FolderView);
