import { Button, message } from 'antd';
import { makeObservable, observable, action } from 'mobx';
import EditorView from '../editor/EditorView';
import InputView from '../input/InputView';
import * as textVMUtil from '../text/TextVMUtil'
import * as apiUtil from '../../util/apiUtil'
import TextAreaView from '../textarea/TextAreaView';

export class CommentVM {
  constructor() {
    makeObservable(this, {
      comment: observable
    })
  }

  comment = undefined
  getComment = () => {
    if (!this.comment) {
      this.comment = '';
    }
    return this.comment;
  }
  setComment = (value) => {
    this.comment = value;
  }

  addItem = () => {
    console.log(this.getUserName(), this.getComment());
  }

  getReactElement = () => {
    var commentVM = textVMUtil.get(this.getComment());
    commentVM.onSetContent = (v) => this.setComment(v);
    var commentInput = <TextAreaView store={commentVM} />

    return <>
      <div style={{ width: 200 }}>
        <div style={{ height: 60 }}>
          {commentInput}
        </div>
        <div style={{ marginTop: 5 }}>
          <Button type='primary' size='small' onClick={this.addItem}>Add</Button>
        </div>
      </div>
    </>
  }
}