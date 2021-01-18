import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import * as util from '../../util/htmlUtil'
import TextView from "../text/TextView";
import { renderToString } from 'react-dom/server'
import * as htmlRenderVMUtil from './HtmlRenderVMUtil'
import * as viewType from "../../constant/viewType"
import * as htmlUtil from "../../util/htmlUtil"
import InputView from "../input/InputView";
import { Button } from "antd";

class HtmlRenderView extends Component {
  constructor(props) {
    super(props);
    this.itemRef = React.createRef()

    var { store } = this.props;
    if (!store) {
      var content = `<p>store của textView</p>`
      this.state = htmlRenderVMUtil.get(content);
    } else {
      this.state = store;
    }
  }

  componentDidMount() {
    var data = this.state;
    data.renderReactElements();
  }

  onClick2 = () => {
    var data = this.state;
    data.renderReactElements();
  }

  getWrapperContent = () => {
    var { wrapper } = this.state;
    if (!wrapper) return '';
    return wrapper;
  }

  render() {
    var data = this.state;
    var content = data.getRefinedContent();

    return (
      <>
        <div>
          <div ref={this.itemRef}
            dangerouslySetInnerHTML={util.createMarkup(content)} />
          {this.getWrapperContent()}
        </div>
      </>
    )
  }
}

export default observer(HtmlRenderView)