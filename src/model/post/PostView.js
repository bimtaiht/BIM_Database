
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { PostVM } from './PostVM';

class PostView extends Component {
  constructor(props) {
    super(props);
    var { store } = this.props;
    if (!store) {
      this.state = new PostVM();
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

export default observer(PostView);
