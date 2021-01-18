import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import * as checkboxVMUtil from './CheckboxVMUtil'

class CheckboxView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = checkboxVMUtil.get(false);
    } else {
      this.state = store;
    }
  }

  onCheckedChange = (e) => {
    var { checked } = e.target;
    this.state.Ischecked = checked;
  }

  render() {
    var { ischecked, name, isDisable } = this.state;

    return (
      <>
      <label>
        <input type="checkbox" 
          checked={ischecked}
          onChange={this.onCheckedChange} disabled={isDisable}/>
          {name} 
        </label>
      </>
    )
  }
}

export default observer(CheckboxView)