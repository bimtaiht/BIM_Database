import { Button, message } from 'antd';
import { makeObservable, observable, action } from 'mobx';
import EditorView from '../editor/EditorView';
import InputView from '../input/InputView';
import * as textVMUtil from '../text/TextVMUtil'
import * as apiUtil from '../../util/apiUtil'

export class PostVM {
  constructor() {
    makeObservable(this, {
      group: observable,
      description: observable,
      content: observable
    })
  }

  parent

  group = undefined
  getGroup = () => {
    if (!this.group) {
      this.group = 'WebAPI'
    }
    return this.group;
  }
  setGroup = (value) => {
    this.group = value;
  }

  description = undefined
  getDescription = () => {
    if (!this.description) {
      this.description = `Mô tả nội dung`
    }
    return this.description;
  }
  setDescription = (value) => {
    this.description = value;
  }

  order
  getOrder = () => {
    if (!this.order) {
      var parent = this.parent;
      if (!parent) {
        this.order = 0;
      }
      else {
        var list = parent.items;
        var lastItem = list[list.length - 1];
        this.order = lastItem.order + 1;
      }
      return this.order;
    }
  }
  setOrder = (value) => {
    this.order = value;
  }

  content = undefined
  getContent = () => {
    if (!this.content) {
      this.content = `Nội dung văn bản`;
    }
    return this.content;
  }
  setContent = (value) => {
    this.content = value;
  }

  addItem = () => {
    var group = this.getGroup();
    var description = this.getDescription();
    var content  = this.getContent();
    var order = this.getOrder();

    var data = {group, description, content, order};
    var url = `${apiUtil.API_URL}/hbp/add`
    apiUtil.post(url, data).then(res => {
      message.success('add post successfully!');
    });
  }

  getReactElement = () => {
    var groupVM = textVMUtil.get(this.getGroup());
    groupVM.onSetContent = (v) => this.setGroup(v);
    var groupInput = <InputView store={groupVM} />

    var descVM = textVMUtil.get(this.getDescription());
    descVM.onSetContent = (v) => this.setDescription(v);
    var descInput = <InputView store={descVM} />

    var orderVM = textVMUtil.get(this.getOrder());
    orderVM.onSetContent = (v) => this.setOrder(v);
    var orderInput = <InputView store={orderVM} />

    var contentVM = textVMUtil.get(this.getContent());
    contentVM.onSetContent = (v) => this.setContent(v);
    var contentEditor = <EditorView store={contentVM} />

    return <>
      <div>
        {groupInput}
      </div>
      <div style={{ marginTop: 20 }}>
        {descInput}
      </div>
      <div style={{ marginTop: 20 }}>
        {orderInput}
      </div>
      <div style={{ marginTop: 20, height: 300 }}>
        {contentEditor}
      </div>
      <div style={{ marginTop: 20 }}>
        <Button type='primary' size='small' onClick={this.addItem}>Add</Button>
      </div>
    </>
  }
}