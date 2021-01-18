import { Button } from "antd";
import TextView from "../text/TextView";
import { MapItemVM } from "./MapItemVM"

export const get = (left, top, name) => {
  var qI = new MapItemVM();
  qI.left = left;
  qI.top = top;
  qI.name = name;
  return qI;
}

export const getDefaultTemplate = (data, parent) => {
  var { left, top, name } = data;
  var item = get(left, top, name);

  item.data = data;
  item.parent = parent;

  var data = {group : name};
  item.wrapper = <Button type='primary' size='small' onClick={() => parent.request(data)}>
    <TextView store={item.getNameVM()} />
  </Button>

  return item;
}