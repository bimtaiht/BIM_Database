import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Input } from "antd";
import * as textVMUtil from '../text/TextVMUtil'

class InputView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      var content = `Nội dung input`
      this.state = textVMUtil.get(content);
    } else {
      this.state = store;
    }
  }

  onChange = (e) => {
    var { value } = e.target;
    this.state.Content = value;
  }

  render() {
    var { content, placeholder } = this.state;

    return (
      <>
        <Input value={content} onChange={this.onChange}
          placeholder={placeholder}/>
      </>
    )
  }
}

export default observer(InputView)