/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import ButtonLeft from '../../containers/ButtonLeftContainer';
import './style.less';
import { SERVER_IP_JIG, defaultDataSourceTemplate, defaultGetParamTemplate, defaultRequestFilters } from '../../constants/Settings';

const JigShelfCardLeftButtonApi = `${SERVER_IP_JIG}/ams/jig/base/shelf/query/item/shelflayer`;
const JigShelfCardLeftButton = (props) => {
  const { shelfSide } = props;
  const zujianLeft = shelfSide ? shelfSide.map((v, i) => <ButtonLeft
    shelfSide={v.shelfside || ''}
    key={i}
    action={JigShelfCardLeftButtonApi}
    dataSourceTemplate={defaultDataSourceTemplate}
    paramTemplate={defaultGetParamTemplate}
    filters={defaultRequestFilters}
  />) : '';
  return (
    <div>
      {zujianLeft || ''}
    </div>
  );
};
JigShelfCardLeftButton.defaultProps = {

};
JigShelfCardLeftButton.propTypes = {

};

export default JigShelfCardLeftButton;
