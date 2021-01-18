import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Col, Row } from 'antd';
import { withRouter } from "react-router-dom";
import { MassDetailVM } from './MassDetailVM';
import MassDetailTableView from './MassDetailTableView';

class MassDetailView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new MassDetailVM();
    } else {
      this.state = store;
    }
  }

  componentDidMount() {
    var data = this.state;
    const id = this.props.match.params.id;
    data.id = id;
  }

  render() {
    var data = this.state;

    return (
      <>
        <Row gutter={10} style={{ padding: 15 }}>
          <Col span={8}>
            <h4 className='text-center'>BẢNG CHI TIẾT KHỐI LƯỢNG</h4>
            <div>
              <MassDetailTableView store={data.DetailTable} />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(observer(MassDetailView));
