import React from 'react';
import Table from '../../../../components/Table';
import Page from '../../../../components/Page';
import ResultArea from '../../../../components/ResultArea';
import Bread from '../../../../components/Bread';
import TitleBar from '../../../../components/TitleBar';
import site from '../../../../assets/site.svg';
import PageTitle from '../../../../components/PageTitle';
import {
  breadMap,
  waterLevelAlarmTableField,
} from './config';
import './style.less';

class WaterLevelAlarm extends React.Component {
  render() {
    return (
      <Page>
        <Bread breadMap={breadMap} />
        <div className="noFormTitle">
          <TitleBar pageTitle={<PageTitle logo={site} title="水位预警" />} />
        </div>
        <ResultArea>
          <Table
            title="水位预警"
            columns={waterLevelAlarmTableField}
            defaultPageSize={10}
          />
        </ResultArea>
      </Page>
    );
  }
}
export default WaterLevelAlarm;
