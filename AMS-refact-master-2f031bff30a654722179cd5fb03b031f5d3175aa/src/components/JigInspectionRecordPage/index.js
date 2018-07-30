import React from 'react';
import { message } from 'antd'
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';;
// import './style.less';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultGetParamTemplate, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import LineChartContainer from '../../containers/LineChartContainer2';
import Modal from '../../containers/ModalContainer';

const dataSourceTemplate = (response) => {
  if (response && 'rows' in response) {
    const data = response.rows;
    if (Array.isArray(data)) {
      const result = data.map((item, idx) => {
        const {
          tensionTopLeft,
          tensionTopRight,
          tensionMiddle,
          tensionBottomLeft,
          tensionBottomRight } = item;
        return {
          idx: idx + 1,
          tensionTopLeft,
          tensionTopRight,
          tensionMiddle,
          tensionBottomLeft,
          tensionBottomRight,
        };
      });
      return result;
    }
  }
  return undefined;
};
const JigInspectionRecordAPI = `${SERVER_IP_JIG}/ams/jig/life/detect/list`;
const columns = [
  {
    children: [
      {
        title: '序号',
        dataIndex: 'num',
        key: 'num1',
        render: (text, record, index) => index + 1,
      },
    ],
  }, {
    title: '基本信息',
    children: [
      {
        title: '二维码',
        dataIndex: 'jigCode',
        key: 'jigCode',
      }, {
        title: '检测时间',
        dataIndex: 'detectTime',
        key: 'detectTime',
      },
    ],
  }, {
    title: '孔壁检测',
    children: [
      {
        title: '检测值',
        dataIndex: 'hole',
        key: 'hole',
      }, {
        title: '检测结果',
        dataIndex: 'holeResult',
        key: 'holeResult',
      },
    ],
  }, {
    title: '张力检测',
    children: [
      {
        title: '左上',
        dataIndex: 'tensionTopLeft',
        key: 'tensionTopLeft',
      }, {
        title: '右上',
        dataIndex: 'tensionTopRight',
        key: 'tensionTopRight',
      }, {
        title: '中',
        dataIndex: 'tensionMiddle',
        key: 'tensionMiddle',
      }, {
        title: '左下',
        dataIndex: 'tensionBottomLeft',
        key: 'tensionBottomLeft',
      }, {
        title: '右下',
        dataIndex: 'tensionBottomRight',
        key: 'tensionBottomRight',
      }, {
        title: '检测结果',
        dataIndex: 'tensionResult',
        key: 'tensionResult',
      },
    ],
  }];

  const checkTemplate = (data) => {
    const { jsonData } = data;
    const startTime = jsonData.startTime;
    const endTime = jsonData.endTime;   
    if (startTime > endTime) {
      message.error('截止时间不能早于开始时间！', 3);
      return false;
    }
    return true;
  };

const JigInspectionRecordPage = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '治工具管理',
  }, {
    path: '',
    name: '综合查询',
  }, {
    path: '',
    name: '检测记录',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="检测记录" />
      <FormContainer
        name="JigInspectionRecordForm"
        action={JigInspectionRecordAPI}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
        checkTemplate={checkTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="jigCode" className={'label'}>二维码</label>
          <InputContainer type="text" name="jigCode" className={'input'} />
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="startTime" className={'label'}>起始时间</label>
          <span className={'dateInput'}>
            <DatePickerContainer name="startTime" style={{ outline: 'none' }} />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="endTime" className={'label'}>截止时间</label>
          <span className={'dateInput'}>
            <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
          </span>
        </div>
        <input type="submit" value="查询" className={'button'} />
      </FormContainer>
      <TableContainer
        name="JigInspectionRecord"
        formName="JigInspectionRecordForm"
        columns={columns}
        isDouble="ok"
        modalName="JigInspectionRecordTableModule"
        noRowSelection="true"
      />
      <Modal
        name="JigInspectionRecordTableModule"
        title="張力趨勢圖"
        isButton="true"
      >
        <LineChartContainer
          name="linechart"
          containerWidth="90%"
          aspect={1.2}
          action={JigInspectionRecordAPI}
          preload
          dataSourceTemplate={dataSourceTemplate}
          xAxis={{
            dataKey: 'idx',
            label: '序號',
          }}
          yAxis={{
            dataKey: 'tensionTopLeft',
            label: '張力',
          }}
          lines={[
            {
              name: '左上',
              type: 'linear',
              dataKey: 'tensionTopLeft',
              stroke: '#8884d8',
            },
            {
              name: '右上',
              type: 'linear',
              dataKey: 'tensionTopRight',
              stroke: '#0101DF',
            },
            {
              name: '中',
              type: 'linear',
              dataKey: 'tensionMiddle',
              stroke: '#CC2EFA',
            },
            {
              name: '左下',
              type: 'linear',
              dataKey: 'tensionBottomLeft',
              stroke: '#04B404',
            },
            {
              name: '右下',
              type: 'linear',
              dataKey: 'tensionBottomRight',
              stroke: '#B18904',
            },
          ]}
          grid
          legend
          tooltip
        />
      </Modal>
    </div>
  );
};
JigInspectionRecordPage.defaultProps = {

};
JigInspectionRecordPage.propTypes = {

};

export default JigInspectionRecordPage;
