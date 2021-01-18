import React, { Component } from 'react';
import { observer } from 'mobx-react';

import * as folderUtil from './FolderUtil'
import * as folderVMUtil from './FolderVMUtil'
import * as groupVMUtil from './FolderGroupVMUtil'
import * as fileUtil from '../file/FileUtil'
import FolderGroup from './FolderGroup';
import FolderView from './FolderView';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

class FolderGroupView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      var group = new FolderGroup();
      var f0 = group.getMainFolder();

      // // Test tạo dữ liệu bên trong
      // for (var i = 0; i < 2; i++) {
      //   var f1 = f0.addSub(`Folder ${i + 1}`);

      //   for (var j = 0; j < 3; j++) {
      //     //fileUtil.add(`File ${j + 1}`, f1);
      //     f1.addFile(`File ${j + 1}`);
      //   }
      //   for (var j = 0; j < 3; j++) {
      //     var f2 = f1.addSub(`Folder ${i + 1}.${j + 1}`);
      //   }
      // }

      for (var i = 0; i < 2; i++) {
        var f1 = f0.addSub(`Folder ${i + 1}`);
      }

      this.state = groupVMUtil.get(group);

    }else{
      this.state = store;
    }
  }

  getItemViews = () => {
    var data = this.state;
    var item = data;
    var fVM = item.getMainFolderVM();
    return  fVM.getSubItemViews();
  }

  addFolder = () => {
    var data = this.state;
    var item = data;
    item.addFolderVM();
  }

  render () {
    var data = this.state;
    var item = data;

    if (!this.itemViews){
      this.itemViews = this.getItemViews();
    }

    return (
      <>
        <div style={item.getStyle()}>
          <Button style={{ marginLeft: 10 }} 
            onClick={this.addFolder} size="small">
            <PlusOutlined/>
          </Button>
          {this.getItemViews()}
        </div>
      </>
    );
  }
}

export default observer(FolderGroupView);
