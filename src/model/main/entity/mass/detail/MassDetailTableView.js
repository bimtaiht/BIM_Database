import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Col, Row } from 'antd';
import MassDetailTable from './MassDetailTable';

class MassDetailTableView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MassDetailTable();
    } else {
      this.state = store;
    }
  }

  render() {
    var data = this.state;
    var colElems = data.Columns.map((x,i) => {
      return <th scope="col" key={i} className='text-center'>{x.Name}</th>
    })

    var rowElems = data.Rows.map((x, i) => {
      var cellElems = x.Cells.map((y, j) => {
        return <td key={j} className={y.className}>{y.ValueString}</td>
      })
      return <tr key={i}>
        {cellElems}
      </tr>
    })

    return (
      <>
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
             {colElems}
            </tr>
          </thead>
          <tbody>
            {rowElems}
          </tbody>
        </table>
      </>
    );
  }
}

export default observer(MassDetailTableView);
