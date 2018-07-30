/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import JigShelfTitle from '../JigShelfTitle';
import JigShelfCardLeftButton from '../../containers/JigShelfCardLeftButtonContainer';
import JigShelfCardRightList from '../../containers/JigShelfCardRightListContainer';
import { SERVER_IP_JIG, defaultDataSourceTemplate, defaultGetParamTemplate, defaultRequestFilters } from '../../constants/Settings';
import './style.less';

const JigShelfCardLeftButtonApi = `${SERVER_IP_JIG}/ams/jig/base/shelf/query/item/shelflayer`;
const data = {
  areaCode: 'A',
  jigTypeId: '1',
  shelfside: '1',
  size: 1000,
};
const JigShelfCard = ({ name }) => (
  <div className={'cardtop'}>
    <JigShelfTitle name={name || 'A'} />
    <Row>
      <Col span={6}>
        <div className={'cardLeft'}>
          <JigShelfCardLeftButton
            action={JigShelfCardLeftButtonApi}
            dataSourceTemplate={defaultDataSourceTemplate}
            paramTemplate={defaultGetParamTemplate}
            filters={defaultRequestFilters}
            data={data}
            propsName="JigShelfCardLeftButtonProps"
          />
        </div>
      </Col>
      <Col span={17} >
        <JigShelfCardRightList />
      </Col>
    </Row>
  </div>
  );

JigShelfCard.defaultProps = {

};
JigShelfCard.propTypes = {

};

export default JigShelfCard;
