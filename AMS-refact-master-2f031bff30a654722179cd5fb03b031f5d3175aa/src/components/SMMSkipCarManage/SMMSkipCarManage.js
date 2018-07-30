import React from 'react';
import PropTypes from 'prop-types';
import { Row, message, Progress } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import ModalFormContainer from '../../containers/ModalFormContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  smmWithPageDataTemplate,
  // defaultDataSourceTemplateList,
  SERVER_IP_SMM,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';
import PercentBar from '../PercentBar';

const smmSkipCarManageAPI = `${SERVER_IP_SMM}/smm/resources/querycar`;
const smmSkipCarManageAPIAdds = `${SERVER_IP_SMM}/smm/resources/addbatchcar`;
const smmSkipCarManageAPIAdd = `${SERVER_IP_SMM}/smm/resources/addcar`;
const smmSkipCarManageAPIDelete = `${SERVER_IP_SMM}/smm/resources/deletecar`;
const smmSkipcarManageshelf = `${SERVER_IP_SMM}/smm/resources/querycarshelf`;
// const smmSkipCarManageAPIUpdate = `${SERVER_IP_SMM}/smm/resources/updatecarled`;
const smmSkipCarManageAPIUpdateDetail = `${SERVER_IP_SMM}/smm/resources/updatecarshelfled`;
const SMMLightAPION = `${SERVER_IP_SMM}/smm/light/car/on`;
const SMMLightAPIOFF = `${SERVER_IP_SMM}/smm/light/car/off`;

const MainFormName = 'SMMSkipCarManageForm';
const MainTableName = 'SMMSkipCarManageTable';
const breadMap = [
  {
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '原材料管理',
  }, {
    path: '',
    name: '原材料管理设置',
  }, {
    path: '',
    name: '料车管理',
  },
];
const SMMStatusDataParamTemplate = (param) => {
  const list = [];
  param.map((v) => {
    const ledAddress = {
      led_address: v.led_address,
    };
    list.push(ledAddress);
    return null;
  });
  const [...data] = list;
  return {
    condition: data,
  };
};

const smmSkipCarManagePramTemplateDetail = (params) => {
  const { dataParam } = params;
  return {
    value: JSON.stringify([{ car_name: dataParam.car_name, shelf_name: dataParam.shelf_name, led_address: dataParam.led_address }]),
  };
};

const smmSkipCarManagePramTemplateDel = (param) => {
  const list = [];
  param.map((v) => {
    const ledAddress = {
      car_name: v.car_name,
    };
    list.push(ledAddress);
    return null;
  });
  const [...data] = list;
  const page = { size: 10, current: 1 };
  return {
    value: data,
    page,
  };
};
const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, record, index) => index + 1,
  }, {
    title: '料车名称',
    dataIndex: 'car_name',
    key: 'car_name',
  }, {
    title: '料车类型',
    dataIndex: 'type',
    key: 'type',
    render: (text) => {
      switch (text) {
        case 0:
          return '备料车';
        case 1:
          return '余料车';
        case 2:
          return '首盘料车';
        case 3:
          return '入库料车';
        default:
          return '未定义';
      }
    }
  }, {
    title: '更新时间',
    dataIndex: 'update_time',
    index: 'update_time',
  },
];



export const skipCarcolumnsTemplate = (param) => {
 
  const columnsRP = [
    {
      title: '序号',
      dataIndex: 'name1',
      key: 'name1',
      render: (text, record, index) => index + 1,
    }, {
      title: '架位名称',
      dataIndex: 'shelf_name',
      key: 'shelf_name',
    }, {
      title: 'Led地址',
      dataIndex: 'led_address',
      key: 'led_address',
      render: (text, record) => {
        const { editable } = record;
        return (
          <EditableCell
            defaultValue={text}
            editable={editable}
            formName="SMMSkipshelfTab"
            name="led_address"
          />
        );
      },
    }, {
      title: '电量',
      dataIndex: 'electricity',
      index: 'electricity',
      render: (text) => (<PercentBar percent={text} />),
    }, {
      title: '信号强度',
      dataIndex: 'level',
      key: 'level',
      render: (text, record) => (record.level),
    }, {
      title: '更新时间',
      dataIndex: 'update_time',
      index: 'update_time',
    }, {
      title: '状态',
      dataIndex: 'status',
      index: 'status',
      render: (text, record) => {
        if (record.status === 1) {
          return (<span style={{ width: '15px', height: '15px', borderRadius: '50%', display: 'inline-block', background: 'green' }} />);
        }
        return (<span style={{ width: '15px', height: '15px', borderRadius: '50%', display: 'inline-block', background: '#ccc' }} />);
      },
    }, {
      title: '操作',
      key: 'updata',
      render: (text, record, index) => {
        const { editable } = record;
        return (
          <div>
            {
              <EditableCellButton
                editable={editable}
                index={index}
                // formName="SMMSkipshelfTab"
                tableName="SMMSkipshelfTab"
                needForName="SMMSkipshelfTab"
                needData="car_name"
                action={smmSkipCarManageAPIUpdateDetail}
                method="PUT"
                record={record}
                paramTemplate={smmSkipCarManagePramTemplateDetail}
                filters={defaultRequestFilters}
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            }
          </div>
        );
      },
    },
  ];

  const columnshelf = [
    {
      title: '序号',
      dataIndex: 'name1',
      key: 'name1',
      render: (text, record, index) => index + 1,
    }, {
      title: '架位名称',
      dataIndex: 'shelf_name',
      key: 'shelf_name',
    }, {
      title: '更新时间',
      dataIndex: 'update_time',
      index: 'update_time',
    },
  ];
  const { clickTableData } = param;
  const carName = clickTableData ? clickTableData.car_name : '';
  const checkRPCar = carName ? carName.substring(0, 6) : '';
  if (checkRPCar === 'RP-CAR') {
    return columnsRP;
  } else {
    return columnshelf;
  }

}
const selData = [
  {
    code: '0',
    value: '备料车',
  }, {
    code: '1',
    value: '余料车',
  }, {
    code: '2',
    value: '首盘料车',
  }, {
    code: '3',
    value: '入库料车',
  },
];


const checkTemplate = (data) => {
  const type = Number(data.type);
  if (type === -1) {
    message.warning('请选择料车类型');
    return false;
  }
  return true;
};


const SMMSkipCarManage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="料车管理" />
    <FormContainer
      name="SMMSkipCarManageForm"
      action={smmSkipCarManageAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>标签名</label>
        <InputContainer type="text" name="car_name" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="led_address" className={'label'}>LED地址</label>
        <InputContainer type="text" name="led_address" className={'input'} />
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <div className={'divBtn'}>
      <Modal name="SMMSkipCarManageAdds" btnName="批量新增" title="批量新增">
        <ModalFormContainer
          name="SMMSkipCarManageAdds"
          action={smmSkipCarManageAPIAdds}
          method="POST"
          dataTemplate={smmWithPageDataTemplate}
          filters={defaultRequestFilters}
          modalName="SMMSkipCarManageAdds"
          checkTemplate={checkTemplate}
          formName={MainFormName}
        >
          <div className={'modalStyle'}>
            <Row className={'selectLabel'}>
              <label htmlFor="type">料车类型:</label>
              <Select
                name="type"
                className={'select'}
                itemKey="code"
                itemValue="value"
                data={selData}
                load="true"
              />
            </Row>
            <Row>
              <label htmlFor="car_name">料车名称:</label>
              <InputContainer type="text" name="car_name" />
            </Row>
            <Row>
              <label htmlFor="size">新增数量:</label>
              <InputContainer type="text" name="size" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalFormContainer>
      </Modal>

      <Modal name="SMMSkipCarManageAdd" btnName="单个增加" title="单个增加">
        <ModalFormContainer
          name="SMMSkipCarManageAdd"
          action={smmSkipCarManageAPIAdd}
          method="POST"
          dataTemplate={smmWithPageDataTemplate}
          filters={defaultRequestFilters}
          modalName="SMMSkipCarManageAdd"
          checkTemplate={checkTemplate}
          formName={MainFormName}
        >
          <div className={'modalStyle'}>
            <Row className={'selectLabel'}>
              <label htmlFor="type">料车类型:</label>
              <Select
                name="type"
                className={'select'}
                itemKey="code"
                itemValue="value"
                data={selData}
                load="true"
              />
            </Row>
            <Row>
              <label htmlFor="car_name">料车名称:</label>
              <InputContainer type="text" name="car_name" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalFormContainer>
      </Modal>

      <ActionBtn
        btnName="删除"
        mode="checkDataDel"
        action={smmSkipCarManageAPIDelete}
        method="PUT"
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        selectedTemplate={rows => ({ car_name: rows.car_name, led_address: rows.led_address, })}
        dataTemplate={smmSkipCarManagePramTemplateDel}
        dataSourceTemplate={defaultDataSourceTemplate}
      />
    </div>
    <TableContainer
      name={MainTableName}
      formName={MainFormName}
      columns={columns}
      action={smmSkipcarManageshelf}
      paramTemplate={defaultGetParamTemplate2}
      needData="car_name"
      aliasName="car_name"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      nextTableName="SMMSkipshelfTab"
      isGetDate="ok"
      onRowClick
    />
    <Title name="架位详情" />
    <ActionBtn
      btnName="开灯"
      mode="turnLight"
      action={SMMLightAPION}
      tableName="SMMSkipshelfTab"
      formName={MainFormName}
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
      needTableName={MainTableName}
      style={{ margin: '10px' }}
      filters={defaultRequestFilters}
    />
    <ActionBtn
      btnName="关灯"
      mode="turnLight"
      action={SMMLightAPIOFF}
      tableName="SMMSkipshelfTab"
      formName={MainFormName}
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
      needTableName={MainTableName}
      filters={defaultRequestFilters}
    />
    <QueryTableContainer
      name="SMMSkipshelfTab"
      // columns={columnshelf}
      columnsTemplate={skipCarcolumnsTemplate}
      tableName={MainTableName}
      dataSourceTemplate={data => (data && data[0] ? defaultDataSourceTemplate(data[0].list) : [])}
    //dataSourceTemplate={data => defaultDataSourceTemplateList(data)}

    />
  </div>
);
SMMSkipCarManage.defaultProps = {

};
SMMSkipCarManage.propTypes = {

};

export default SMMSkipCarManage;
