import { Component } from "react";
import { observer } from 'mobx-react';
import { Button } from "antd";
import Highlight from "react-highlight.js";

class SyntaxHighlighterView extends Component {
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

  render()  {
    var {content} = this.state;
    return (
      <>
        <Highlight language='lang-cs' style={{height:'100%'}}>
          {content}
        </Highlight>
      </>
    )
  }
}

export default observer(SyntaxHighlighterView)