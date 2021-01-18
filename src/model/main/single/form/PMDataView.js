import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Col, Row } from 'antd';
import Workpackage_DictView from '../../entity/workpackage/Workpackage_DictView';
import ElementFilterSetting_DictView from '../../entity/setting/elementFilter/ElementFilterSetting_DictView';
import MassExportSetting_DictView from '../../entity/setting/massExport/MassExportSetting_DictView';
import MassGroupSetting_DictView from '../../entity/setting/massGroup/MassGroupSetting_DictView';

import { PMDataVM } from './PMDataVM';
import MassResultCompView from '../../entity/mass/result/MassResultCompView';

class PMDataView extends Component {
  get pmDataVM() { return PMDataVM.Instance };

  render() {
    var data = this.pmDataVM;

    return (
      <>
        <Row gutter={15} style={{ padding: 15 }}>
          <Col span={6}>
            <Workpackage_DictView store={data.Workpackage_DictVM} />

            <ElementFilterSetting_DictView store={data.ElementFilterSetting_DictVM} />

            <MassExportSetting_DictView store={data.MassExportSetting_DictVM} />

            <MassGroupSetting_DictView store={data.MassGroupSetting_DictVM} />
          </Col>
          <Col span={14}>
            <MassResultCompView store={data.MassResultCompVM} />
          </Col>
        </Row>
      </>
    );
  }
}

export default observer(PMDataView);
