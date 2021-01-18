import { Editor } from "@tinymce/tinymce-react";
import { Component } from "react";
import * as constant from '../../constant/constantValue'
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';

const { TinyAPIKey } = constant;

class EditorView extends Component {
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

  onEditorChange = (content, editor) => {
    var data = this.state;
    data.setContent(content);
  }

  render(){
    var {content} = this.state;

    return (
      <Editor apiKey={TinyAPIKey}
        value={content}
        init={{
          //width : 1000,
          entity_encoding : "raw",
          height: '100%',
          menubar: false,
          plugins: [
            `advlist autolink lists link image charmap print preview anchor
            searchreplace visualblocks code
            insertdatetime media table paste code help wordcount`
          ],
          toolbar: `undo redo | formatselect  | bold italic`

        }}
        onEditorChange={this.onEditorChange}
      />
    )
  }
}

export default observer(EditorView)