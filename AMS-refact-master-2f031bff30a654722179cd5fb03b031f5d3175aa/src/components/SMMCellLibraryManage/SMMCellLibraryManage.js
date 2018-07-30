import React from 'react';
import { Row, message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import UploadContainer from '../../containers/UploadContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import {
  defaultGetParamTemplate3,
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_SMM,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

// 14.4 删除元件
const smmCellLibMngDltAPI = `${SERVER_IP_SMM}/smm/del/component`;
const smmCellLibMngSearchAPI = `${SERVER_IP_SMM}/smm/components`;
const smmCellLibMngAddAPI = `${SERVER_IP_SMM}/smm/component`;
const smmCellLibMngUpdateAPI = `${SERVER_IP_SMM}/smm/component`;
const UploadAPI = `${SERVER_IP_SMM}/webapi/ams/smm/components/upload`;
const paramTemplate = file => ({
  param: [`$FILE:${file.name}`],
});

const SMMStatusDataParamTemplateDel = (param) => {
  console.log(param);
  return {
    value: JSON.stringify([{ id: param[0].id }]),
  };
};

const smmWithPageDataTemplate = (param) => {
  const { ...data } = param;
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  return {
    value: dataStr || [],
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
    name: '原材料管理设置',
  }, {
    path: '',
    name: '元件库管理',
  }];

const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '料号',
    dataIndex: 'materialNo',
    key: 'materialNo',
  }, {
    title: '整盘数量',
    dataIndex: 'diskQuantity',
    index: 'diskQuantity',
  }, {
    title: '料宽',
    dataIndex: 'width',
    index: 'width',
  }, {
    title: '间距',
    dataIndex: 'pitch',
    index: 'pitch',
  }, {
    title: '规格',
    dataIndex: 'specifications',
    index: 'specifications',
  }, {
    title: '标记',
    dataIndex: 'mark',
    index: 'mark',
  }, {
    title: '保质期（天）',
    dataIndex: 'shelfLife',
    index: 'shelfLife',
  }];

const checkActionTemplate = (data) => {
  console.log(data);
  const newUrl = data.replace(/ams\//, "");
  console.log(newUrl);
  return newUrl;
};
const SMMCellLibraryManage = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="元件库管理" />
    <FormContainer
      name="SMMCellLibraryManageForm"
      action={smmCellLibMngSearchAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate3}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>料号</label>
        <InputContainer type="text" name="materialNo" className={'input'} value="" />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>整盘料量</label>
        <InputContainer type="text" name="diskQuantity" className={'input'} value="" />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>料宽</label>
        <InputContainer type="text" name="width" className={'input'} value="" />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>间距</label>
        <InputContainer type="text" name="pitch" className={'input'} value="" />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>规格</label>
        <InputContainer type="text" name="specifications" className={'input'} value="" />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>标记</label>
        <InputContainer type="text" name="mark" className={'input'} value="" />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>保质期</label>
        <InputContainer type="text" name="shelfLife" className={'input'} value="" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Row>
        <span>批量更新元件</span>
        <UploadContainer
          name="UploadName"
          action={UploadAPI}
          paramTemplate={paramTemplate}
          checkActionTemplate={checkActionTemplate}
          dataSourceTemplate={defaultDataSourceTemplate}
          onSuccess={response => message.success(response.message ? response.message : 'upload success!')}
          onError={e => message.error(e)}
          preload
        />
      </Row>
      <Modal name="SMMCellLibMngAdd" btnName="新增" title="新增" >
        <ModalForm
          name="smmCellLibMngAdd"
          action={smmCellLibMngAddAPI}
          method="PUT"
          dataTemplate={smmWithPageDataTemplate}
          filters={defaultRequestFilters}
          modalName="SMMCellLibMngAdd"
          formName="SMMCellLibMngForm"
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="materialNo">料号:</label>
              <InputContainer type="text" name="materialNo" value="" />
            </Row>
            <Row>
              <label htmlFor="diskQuantity">整盘料量:</label>
              <InputContainer type="text" name="diskQuantity" value="" />
            </Row>
            <Row>
              <label htmlFor="width">料宽:</label>
              <InputContainer type="text" name="width" value="" />
            </Row>
            <Row>
              <label htmlFor="pitch">间距:</label>
              <InputContainer type="text" name="pitch" value="" />
            </Row>
            <Row>
              <label htmlFor="specifications">规格:</label>
              <InputContainer type="text" name="specifications" value="" />
            </Row>
            <Row>
              <label htmlFor="mark">标记:</label>
              <InputContainer type="text" name="mark" value="" />
            </Row>
            <Row>
              <label htmlFor="shelfLife">保质期:</label>
              <InputContainer type="text" name="shelfLife" value="" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal name="SMMCellLibMngFix" btnName="修改更新" title="修改更新" >
        <ModalForm
          name="SMMCellLibMngFix"
          action={smmCellLibMngUpdateAPI}
          method="POST"
          dataTemplate={smmWithPageDataTemplate}
          filters={defaultRequestFilters}
          modalName="SMMCellLibMngFix"
          formName="SMMCellLibMngForm"
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="id">主键:</label>
              <InputContainer type="text" name="id" value="" />
            </Row>
            <Row>
              <label htmlFor="materialNo">料号:</label>
              <InputContainer type="text" name="materialNo" value="" />
            </Row>
            <Row>
              <label htmlFor="diskQuantity">整盘料量:</label>
              <InputContainer type="text" name="diskQuantity" value="" />
            </Row>
            <Row>
              <label htmlFor="width">料宽:</label>
              <InputContainer type="text" name="width" value="" />
            </Row>
            <Row>
              <label htmlFor="pitch">间距:</label>
              <InputContainer type="text" name="pitch" value="" />
            </Row>
            <Row>
              <label htmlFor="specifications">规格:</label>
              <InputContainer type="text" name="specifications" value="" />
            </Row>
            <Row>
              <label htmlFor="mark">标记:</label>
              <InputContainer type="text" name="mark" value="" />
            </Row>
            <Row>
              <label htmlFor="shelfLife">保质期:</label>
              <InputContainer type="text" name="shelfLife" value="" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="删除"
        mode="cellLibMngDel"
        action={smmCellLibMngDltAPI}
        method="POST"
        tableName="SMMCellLibraryManageTable"
        selectedTemplate={rows => ({ id: rows.id })}
        dataTemplate={SMMStatusDataParamTemplateDel}
        // formName="SMMCellLibMngForm"
        // paramTemplate={() => ('')}
        // dataSourceTemplate={defaultDataSourceTemplate}
      />
    </div>
    <TableContainer
      name="SMMCellLibraryManageTable"
      formName="SMMCellLibraryManageForm"
      columns={columns}
    />
  </div>
);
SMMCellLibraryManage.defaultProps = {

};
SMMCellLibraryManage.propTypes = {

};

export default SMMCellLibraryManage;
