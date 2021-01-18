import { Component } from "react";
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Divider, Input, Select } from "antd";
import InputView from "../../../../input/InputView";
import CheckboxView from "../../../../checkbox/CheckboxView";
import MassTable from "./MassTable";
import TextView from "../../../../text/TextView";
import MassRowView from "./MassRowView";

const { Option } = Select;

class MassTableView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MassTable();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;

    var columns = data.Columns;
    var rows = data.MainRows;

    var thElems = columns ? columns.map((x, i) => {
      return <th scope="col" key={x.id} className='text-center'>{x.Name}</th>
    }) : '';

    var tbodyElems = rows ? rows.map((x, i) => {
      return <MassRowView key={x.id} store={x} />
    }) : '';

    
    return (
      <>
        {data.IsValidTable ?
        <>
          <h4 className="text-center">BẢNG TỔNG HỢP KHỐI LƯỢNG</h4>
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col"></th>
                {thElems}
              </tr>
            </thead>
            <tbody>
              {tbodyElems}
            </tbody>
          </table>
          </> : ''
        }
      </>
    )
  }
}

export default observer(MassTableView)