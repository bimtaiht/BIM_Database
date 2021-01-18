
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { CommentVM } from './CommentVM'

class CommentView extends Component {
  constructor(props) {
    super(props);
    var { store } = this.props;
    if (!store) {
      this.state = new CommentVM();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    return (
      <>
        <div style={{position:'relative'}}>
          {data.getReactElement()}
        </div>
      </>
    )
  }
}

export default observer(CommentView);
