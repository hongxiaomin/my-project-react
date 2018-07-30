/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ButtonList from '../../containers/ButtonListContainer';
import { SERVER_IP_JIG, defaultDataSourceTemplate, defaultGetParamTemplate, defaultRequestFilters } from '../../constants/Settings';

const ButtonListApi = `${SERVER_IP_JIG}/ams/jig/base/shelf/query/item/shelfside`;
const JigShelfManageList = (props) => {
  const { areacode } = props;
  const zujianList = areacode ? areacode.map((v, i) => <ButtonList
    action={ButtonListApi}
    areaCode={v.areacode || ''}
    key={i}
    dataSourceTemplate={defaultDataSourceTemplate}
    paramTemplate={defaultGetParamTemplate}
    filters={defaultRequestFilters}
    styles="button"
  />) : '';
  return (
    <div className={'top'}>
      {zujianList || ''}
    </div>

  );
};
JigShelfManageList.defaultProps = {

};
JigShelfManageList.propTypes = {

};

export default JigShelfManageList;
