import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from "antd";

class TextView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = {
        content: `Nội dung`
      }
    } else {
      this.state = store;
    }
  }

  getWrapperContent = () => {
    var { wrapper } = this.state;
    if (!wrapper) return '';
    return wrapper;
  }

  render() {
    var { content } = this.state;

    return (
      <>
        {content}
        {this.getWrapperContent()}
      </>
    )
  }
}

export default observer(TextView)