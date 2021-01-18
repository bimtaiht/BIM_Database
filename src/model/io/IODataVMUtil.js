import SyntaxHighlighterView from "../syntax/SyntaxHighlighterView";
import { IODataVM } from "./IODataVM"
import * as floatItemVMUtil from '../float/FloatItemVMUtil'
import { Button } from "antd";
import FloatItemView from "../float/FloatItemView";
import * as inputVMUtil from '../input/InputVMUtil'
import * as textVMUtil from '../text/TextVMUtil'
import * as inputUtil from '../../util/inputUtil'

export const get = (inputs) => {
  var qI = new IODataVM();
  qI.inputs = inputs;
  return qI;
}

export const getClassDefinition = (inputs) => {
  if (!inputs) {
    inputs = [
      { name: 'class', value: 'Person' },
      { name: 'classDesc', value: 'Kiểu dữ liệu mô phỏng đối tượng người' }
    ]
  }

  var qI = get(inputs);

  // Output
  qI.getOutputFunc = () => {
    var { inputs } = qI;
    var res = `// ${inputUtil.get(inputs, 'classDesc').value}
class ${inputUtil.get(inputs, 'class').value}
{

}`;

    return [res];
  }

  // Content Code View
  var getContent = () => qI.getOutputs()[0];
  var textVM = textVMUtil.get(getContent());

  qI.onSetInput = () => {
    textVM.setContent(getContent());
  }

  // React Elements
  qI.getReactElementsFunc = () => {
    var content = qI.getOutputs()[0];
    return <SyntaxHighlighterView store={textVM} />
  }

  // Wrapper
  var floatItemStore = floatItemVMUtil.get('top right');
  qI.changeData = () => {
    qI.setInput('class', 'Student');
    qI.setInput('classDesc', 'Kiểu dữ liệu mô phỏng sinh viên');
  }
  floatItemStore.wrapper = <Button onClick={qI.changeData}>Test</Button>

  qI.wrapper = <FloatItemView store={floatItemStore} />

  return qI;
}