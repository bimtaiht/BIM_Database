import { makeObservable, observable, action } from 'mobx';
import * as util from '../../util/generalUtil'
import { renderToString } from 'react-dom/server'
import ReactDOM from 'react-dom'
import InputView from '../input/InputView';
import * as viewType from '../../constant/viewType'
import TextView from '../text/TextView';
import * as textVMUtil from '../text/TextVMUtil'
import * as inputUtil from '../../util/inputUtil'

export default class HtmlRenderVM {
  constructor() {
    makeObservable(this, {
      content: observable,
      refinedContent: observable,
      reactElements: observable
    })
  }

  content = undefined
  setContent = (value) => {
    this.content = value;
    this.setData(this.getDataFunc());

    this.renderReactElements();
  }

  inputs = []
  setInput = (input) => {
    if (this.onSetInput) {
      this.onSetInput(input);
    }
  }

  data
  getData = () => {
    if (!this.data) {
      this.data = this.getDataFunc();
    }
    return this.data;
  }
  getDataFunc = () => {
    var content = this.content;
    if (!content){
      content = '';
    }

    var inputs = this.inputs;

    if (!this.isFormatContent) {
      return {
        content
      }
    }

    var res = content.split('{{');
    var reactElements = [];
    res.forEach((x, i) => {
      if (i === 0) return false;

      var bracketIndex = x.indexOf('}}');
      if (bracketIndex === -1) return false;

      var originContent = x.substring(0, bracketIndex);

      // Kiểm tra có phần inputs ko ?
      var res2 = originContent.split(',');
      var view = res2[0];
      let input;
      if (inputs) {
        if (res2.length >= 2) {
          var inputName = res2[1];
          if (inputName.length !== 0) {
            var inputIndex = inputs.findIndex(x => x.name === inputName);
            if (inputIndex === -1) {
              inputs.push(inputUtil.getDefaultInput(inputName));
              inputIndex = inputs.length - 1;
            }
            input = inputs[inputIndex];

            if (res2.length === 3) {
              var label = res2[2];
              if (label.length !== 0) {
                input.label = res2[2];
              }
            }
          }
        }
      }

      var findIndex = reactElements.findIndex
        (x => x.originContent === originContent);

      if (findIndex === -1) {
        reactElements.push({
          id: util.randomId(),
          originContent, view, input
        })
      }
    })

    reactElements.forEach(x => {
      var { originContent, id } = x;
      content = content.replace(`{{${originContent}}}`,
        `<span id="${id}" style="display:table"></span>`);
    })

    return {
      content, reactElements
    };
  }

  setData = (value) => {
    this.data = value;
    this.setRefinedContent(this.getRefinedContentFunc());
    this.setReactElements(this.getReactElementsFunc());
  }

  refinedContent = undefined
  getRefinedContent = () => {
    if (!this.refinedContent) {
      var content = this.getRefinedContentFunc();
      this.refinedContent = content;
    }
    return this.refinedContent;
  }
  getRefinedContentFunc = () => {
    return this.getData().content;
  }
  setRefinedContent = (value) => {
    this.refinedContent = value;
  }

  reactElements = undefined
  getReactElements = () => {
    if (!this.reactElements) {
      this.reactElements = this.getReactElementsFunc();
    }
    return this.reactElements;
  }
  getReactElementsFunc = () => {
    var elems = this.getData().reactElements;
    return elems;
  }
  setReactElements = (value) => {
    this.reactElements = value;
  }

  renderReactElements = () => {
    var reactElems = this.getReactElements();

    reactElems.forEach(x => {
      var { id, view, input } = x;
      var location = document.getElementById(id);

      if (input) {
        var { value, label } = input;
        var textVM = textVMUtil.get(value);
        textVM.onSetContent = (value) => {
          input.value = value;
          this.setInput(input);
        }

        let elem;
        switch (view) {
          case viewType.INPUTVIEW:
            elem = <>
              {label ?
                <>
                  <span style={{ display: 'table-cell' }}><b>{label}:</b></span>
                  <span style={{display: 'table-cell',width:10}}></span>
                </> : ''
              }
              <InputView store={textVM} />
            </>;
            break;
          case viewType.TEXTVIEW:
            elem = <TextView store={textVM} />;
            break;
        }


        if (elem && location !== null) {
          ReactDOM.render(elem, location);
        }
      }
    })
  }
}