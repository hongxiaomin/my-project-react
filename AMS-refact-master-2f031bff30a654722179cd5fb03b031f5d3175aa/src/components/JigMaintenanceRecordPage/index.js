import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultDataSourceTemplate, SERVER_IP_JIG, defaultGetParamTemplate } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
// import './style.less';
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const JigMaintenanceRecordAPI = `${SERVER_IP_JIG}/ams/jig/life/repair/list`;
const columns = [
  {
    children: [
      {
        title: '序号',
        dataIndex: 'num',
        key: 'num1',
        render: (text, record, index) => {
          if (record.repairStatus === 2) {
            return (<p style={{ background: 'red' }} className={'inlineTable'}>{(index + 1)}</p>);
          }
          return (<p style={{ background: '#fff' }} className={'inlineTable'}>{(index + 1)}</p>);
        },
      },
    ],
  }, {
    title: '治具信息',
    children: [
      {
        title: '二维码',
        dataIndex: 'jigCode',
        key: 'jigCode',
        render: (text, record) => {
          if (record.repairStatus === 2) {
            return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.jigCode}</p>);
          }
          return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.jigCode}</p>);
        },
      }, {
        title: '治具类型',
        dataIndex: 'jigTypeName',
        key: 'jigTypeName',
        render: (text, record) => {
          if (record.repairStatus === 2) {
            return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.jigTypeName}</p>);
          }
          return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.jigTypeName}</p>);
        },
      },
    ],
  }, {
    title: '维修信息',
    children: [
      {
        title: '维修状态',
        dataIndex: 'repairStatus',
        key: 'repairStatus',
        render: (text, record) => {
          let state;
          switch (record.repairStatus) {
            case 2:
              state = '维修超时';
              break;
            case 1:
              state = '维修开始';
              break;
            case 0:
              state = '维修完成';
              break;
            default:
          }
          if (state === '维修超时') {
            return (<p style={{ background: 'red' }} className={'inlineTable'}>{state}</p>);
          }
          return (<p style={{ background: '#fff' }} className={'inlineTable'}>{state}</p>);
        },
      }, {
        title: '维修开始时间',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (text, record) => {
          if (record.repairStatus === 2) {
            return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.startDate}</p>);
          }
          return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.startDate}</p>);
        },
      }, {
        title: '维修开始操作人',
        dataIndex: 'startBy',
        key: 'startBy',
        render: (text, record) => {
          if (record.repairStatus === 2) {
            return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.startBy}</p>);
          }
          return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.startBy}</p>);
        },
      }, {
        title: '维修结束时间',
        dataIndex: 'finishDate',
        key: 'finishDate',
        render: (text, record) => {
          if (record.repairStatus === 2) {
            return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.finishDate}</p>);
          }
          return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.finishDate}</p>);
        },
      }, {
        title: '维修完成操作人',
        dataIndex: 'finishBy',
        key: 'finishBy',
        render: (text, record) => {
          if (record.repairStatus === 2) {
            return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.finishBy}</p>);
          }
          return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.finishBy}</p>);
        },
      },
    ],
  }];
const selDate = [
  { id: 0,
    name: '维修完成',
  }, {
    id: 1,
    name: '维修开始',
  }, {
    id: 2,
    name: '维修超时',
  },
];

const checkTemplate = (data) => {
  const startTime = data.startTime;
  const endTime = data.endTime;
  if (startTime > endTime) {
    message.error('截止时间不能早于开始时间！', 3);
    return false;
  }
  return true;
};

const JigMaintenanceRecordPage = (props) => {
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
    name: '维修记录',
  }];
  return (
    <div className="jigMaintainRecord">
      <Bread breadMap={breadMap} />
      <Title name="维修记录" />
      <FormContainer
        name="JigMaintenanceRecordForm"
        action={JigMaintenanceRecordAPI}
        method="GET"
        dataSourceTemplate={defaultDataSourceTemplate}
        paramTemplate={defaultGetParamTemplate}
        checkTemplate={checkTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="select" className={'label'}>治具类型</label>
          <span className={'select'}>
            <SelectContainer
              name="jigTypeId"
              action={JigTypeAPI}
              itemKey="id"
              itemValue="name"
              next="bom_status2"
              load="true"
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="jigCode" className={'label'}>二维码</label>
          <InputContainer type="text" name="jigCode" className={'input'} />
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="repairStatus" className={'label'}>状态</label>
          <span className="select" >
            <SelectContainer
              name="repairStatus"
              action={JigTypeAPI}
              itemKey="id"
              itemValue="name"
              load="true"
              data={selDate}
            />
          </span>
          {/* <InputContainer type="text" name="repairStatus" className={'input'} /> */}
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
      <TableContainer name="JigMaintenanceRecord" formName="JigMaintenanceRecordForm" columns={columns} noRowSelection="true" />
    </div>
  );
};
JigMaintenanceRecordPage.defaultProps = {

};
JigMaintenanceRecordPage.propTypes = {

};

export default JigMaintenanceRecordPage;
