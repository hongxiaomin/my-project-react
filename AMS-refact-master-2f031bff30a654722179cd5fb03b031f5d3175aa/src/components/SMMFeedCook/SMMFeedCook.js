import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import ModalForm from '../../containers/ModalFormContainer';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  smmWithPageDataTemplate,
  SERVER_IP_SMM,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';

const smmFeedCookAPI = `${SERVER_IP_SMM}/smm/resources/queryfeederbuffershelf`;
const smmFeedCookAPIAdd = `${SERVER_IP_SMM}/smm/resources/addfeederbuffershelf`;
const smmFeedCookAPIDelete = `${SERVER_IP_SMM}/smm/resources/delfeederbuffershelf`;
const smmFeedCookshelf = `${SERVER_IP_SMM}/smm/resources/findbuffershelfdetails`;
const smmFeedCookshelfLedUpdate = `${SERVER_IP_SMM}/smm/resources/updatefeederbuffershelfled`;
const SMMLightAPION = `${SERVER_IP_SMM}/smm/light/fs/on`;
const SMMLightAPIOFF = `${SERVER_IP_SMM}/smm/light/fs/off`;

const smmFeedCookshelfLedUpdateTemplate = (params) => {
  const { dataParam } = params;
  return {
    value: JSON.stringify([{ shelf_no: dataParam.shelf_no, led_address: dataParam.led_address }]),
  };
};

const smmWithPageDataTemplateDel = (param) => {
  const list = [];
  param.map((v) => {
    const ledAddress = {
      shelf_no: v.shelf_no,
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
const breadMap = [
  {
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '原材料管理',
  }, {
    path: '',
    name: 'Feeder管理',
  }, {
    path: '',
    name: 'Feeder缓存区架位管理',
  }];

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, record, index) => index + 1,
  }, {
    title: '大架位',
    dataIndex: 'shelf_no',
    key: 'shelf_no',
  }, {
    title: '当前使用站位',
    dataIndex: 'use_shelf',
    index: 'use_shelf',
  }, {
    title: '站位总数量',
    dataIndex: 'total',
    index: 'total',
  }];

const columnshelf = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '架位名称',
    dataIndex: 'shelf_no',
    key: 'shelf_no',
  }, {
    title: 'Led地址',
    dataIndex: 'led_address',
    index: 'led_address',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="SMMFeedCookshelf"
          name="led_address"
        />
      );
    },
  }, {
    title: '更新时间',
    dataIndex: 'renew',
    index: 'renew',
  },{
    title: '料号',
    dataIndex: 'material_no',
    index: 'material_no',
  },  {
    title: '状态',
    dataIndex: 'led_status',
    index: 'led_status',
   render: (text, record) => {
    if (record.led_status === 1) {
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
              tableName="SMMFeedCookshelf"
              needForName="SMMFeedCookshelf"
              needData="car_name"
              action={smmFeedCookshelfLedUpdate}
              method="PUT"
              record={record}
              paramTemplate={smmFeedCookshelfLedUpdateTemplate}
              filters={defaultRequestFilters}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          }
        </div>
      );
    },
  },];

const SMMFeedCook = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="Feeder缓存区架位管理" />
    <FormContainer
      name="SMMFeedCookForm"
      action={smmFeedCookAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>大架位</label>
        <InputContainer type="text" name="shelf_no" className={'input'} />
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <div className={'divBtn'}>
      <Modal name="SMMFeedCookAddShelf" btnName="增加架位" title="增加架位" >
        <ModalForm
          name="SMMFeedCookAddShelf"
          action={smmFeedCookAPIAdd}
          method="POST"
          dataTemplate={smmWithPageDataTemplate}
          filters={defaultRequestFilters}
          modalName="SMMFeedCookAddShelf"
          formName="SMMFeedCookForm"
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="datepishelf_nocker">大架位</label>
              <InputContainer type="text" name="shelf_no" value="FS" />
            </Row>
            <Row>
              <label htmlFor="inshelf_floorput">层数</label>
              <InputContainer type="text" name="shelf_floor" />
            </Row>
            <Row>
              <label htmlFor="slot_size">每层站别数</label>
              <InputContainer type="text" name="slot_size" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="删除"
        mode="checkDataDel"
        action={smmFeedCookAPIDelete}
        method="PUT"
        tableName="SMMFeedCook"
        formName="SMMFeedCookForm"
        paramTemplate={() => ('')}
        selectedTemplate={rows => ({ shelf_no: rows.shelf_no })}
        dataTemplate={smmWithPageDataTemplateDel}
        dataSourceTemplate={defaultDataSourceTemplate}
      />
    
    </div>
    <TableContainer
      name="SMMFeedCook"
      formName="SMMFeedCookForm"
      columns={columns}
      action={smmFeedCookshelf}
      paramTemplate={defaultGetParamTemplate2}
      needData="shelf_no"
      aliasName="shelf_no"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      nextTableName="SMMFeedCookshelf"
      isGetDate="ok"
      onRowClick
    />
    <Title name="架位详情" />
    <ActionBtn
      btnName="开灯"
      mode="turnLight"
      action={SMMLightAPION}
      tableName="SMMFeedCookshelf"
      formName="SMMFeedCookForm"
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
      needTableName="SMMFeedCook"
      style={{ margin: '10px' }}
      filters={defaultRequestFilters}
    />
    <ActionBtn
      btnName="关灯"
      mode="turnLight"
      action={SMMLightAPIOFF}
      tableName="SMMFeedCookshelf"
      formName="SMMFeedCookForm"
      paramTemplate={SMMStatusDataParamTemplate}
      pcbNewConfigDoubleSelect
      needTableName="SMMFeedCook"
      filters={defaultRequestFilters}
    />
    <QueryTableContainer
      name="SMMFeedCookshelf"
      columns={columnshelf}
      tableName="SMMFeedCook"
      dataSourceTemplate={defaultDataSourceTemplate}
    />
  </div>
);
SMMFeedCook.defaultProps = {

};
SMMFeedCook.propTypes = {

};

export default SMMFeedCook;
