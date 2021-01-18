import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Col, Row } from 'antd';
import { withRouter } from "react-router-dom";
import ProjectCompVM from './ProjectCompVM';
import Phase_DictView from '../../phase/Phase_DictView';
import MassResultCompView from '../../mass/result/MassResultCompView';

class ProjectCompView extends Component {
  constructor(props) {
    super(props);

    var { store } = this.props;
    if (!store) {
      this.state = new ProjectCompVM();
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
    var projectVM = data.ProjectVM;

    return (
      <>
        <div style={{ padding: 15 }}>
          <Row gutter={10}>
            <Col span={5}>
            </Col>
            <Col span={14}>
              {projectVM ? <>
                <h4 className='text-center'>Dự án {projectVM.Name}</h4>
                <Phase_DictView store={projectVM.Phase_DictVM} />

                <MassResultCompView store={data.MassResultCompVM} />
              </> : ''}
            </Col>
            <Col span={5}>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(observer(ProjectCompView));
