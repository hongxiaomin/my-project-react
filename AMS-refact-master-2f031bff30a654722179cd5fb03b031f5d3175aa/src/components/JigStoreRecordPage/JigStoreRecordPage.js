import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import { defaultGetParamTemplate, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import { defaultcolumnsTemplate } from '../../constants/TableConfig';
// import './style.less';
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const JigRecordAPI = `${SERVER_IP_JIG}/ams/jig/life/store/query`;
const emitRequest = {
  name: 'JigStoreRecordPageForm',
  action: JigRecordAPI,
  method: 'GET',
  paramTemplate: defaultGetParamTemplate,
  tableName: 'JigStoreRecord',
  filters: defaultRequestFilters,
  dataSourceTemplate: defaultDataSourceTemplate,
};
const JigStoreRecordPage = (props) => {
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
    name: '库存记录',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="库存记录" />
      <FormContainer
        name="JigStoreRecordPageForm"
        action={JigRecordAPI}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="jigTypeId" className={'label'}>治具类型</label>
          <span className={'select'}>
            <SelectContainer
              name="jigTypeId"
              action={JigTypeAPI}
              itemKey="id"
              itemValue="name"
              load="true"
              dataSourceTemplate={defaultDataSourceTemplate}
              emitRequest={emitRequest}
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="jigCode" className={'label'}>二维码</label>
          <InputContainer type="text" name="jigCode" className={'input'} />
        </div>
        {/* <div className={'searchCondition'}>
          <label htmlFor="input2" className={'label'}>状态</label>
          <InputContainer type="text" name="input2" className={'input'} />
        </div> */}
        <input type="submit" value="查询" className={'button'} />
      </FormContainer>
      <TableContainer
        name="JigStoreRecord"
        formName="JigStoreRecordPageForm"
        columnsTemplate={defaultcolumnsTemplate}
        noRowSelection="true"
        // columnsTemplate={(param) => {
        //   const { ...data } = param;
        //   const dataStr = data.rows;
        //   if (dataStr) {
        //     const datas = [];
        //     dataStr.map((v, i) => {
        //       if (i === 0) {
        //         Object.keys(v).forEach((key) => {
        //           const dataObj = {
        //             title: key,
        //             dataIndex: key,
        //             key,
        //           };
        //           datas.push(dataObj);
        //         });
        //       }
        //     });
        //     return datas;
        //   }
        // }}
        // columns={columns1}
      />
    </div>
  );
};
JigStoreRecordPage.defaultProps = {

};
JigStoreRecordPage.propTypes = {

};

export default JigStoreRecordPage;
