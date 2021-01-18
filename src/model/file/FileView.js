import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { CaretRightFilled, CloseOutlined, FileOutlined, FolderOutlined } from "@ant-design/icons";

class FileView extends Component {
  onClick = () => {
    var item = this.props.store;
    item.setSelected();
  }

  render() {
    var item = this.props.store;

    return (
      <>
        <div style={item.getStyle()}>
          <div style={item.getMarginStyle()}>
            <FileOutlined />
          </div>
          <div style={{ width: '100%' }}
            onClick={this.onClick}>
            <span>
              {item.getName()}
              <CloseOutlined style={{ marginLeft: 10 }}
                onClick={item.delete} />
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default observer(FileView);
