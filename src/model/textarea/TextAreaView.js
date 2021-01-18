import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';

class TextAreaView extends Component {
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

  onChange = (e) => {
    var { value } = e.target;
    this.state.setContent(value);
  }

  getWrapperContent = () => {
    var { wrapper } = this.state;
    if (!wrapper) return '';
    return wrapper;
  }

  getStyle = () => {
    var style = {
      width: '100%',
      height: '100%'
    }

    var { wrapper } = this.state;
    if (wrapper) {
      style.position = 'relative';
    }
    return style;
  }

  render() {
    var data = this.state;
    var { content, wrapper } = data;

    var taElem = <textarea value={content} style={{ width: '100%', height: '100%' }} 
      onChange={this.onChange}/>

    var element = wrapper ? <div style={{ position: 'relative',width: '100%', height: '100%' }}>
      {taElem}{wrapper}
    </div> : taElem;

    return element;
  }
}

export default observer(TextAreaView)