/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import LineChangeCardList from '../../components/LineChangeCardList';
import Title from '../../components/Title';
import './style.less';

const LineChangeCard = (props) => {
  const { data, dataForm, formName } = props;
  const titleName = dataForm && dataForm.lineNum ? dataForm.lineNum : '';
//  const
  const dataList = data.map((v, i) =>
    <LineChangeCardList
      productionPlanQuantity={v.productionPlanQuantity}
      productionQuantity={v.productionQuantity}
      patterName={v.patterName}
      machineName={v.machineName}
      key={i}
      index={i}
      downPatternToLocalStatus={v.downPatternToLocalStatus}
      downPatternToMachineStatus={v.downPatternToMachineStatus}
      machineNameType={v.machine_type_name}
      formName={formName}
    />,
  );
  return (
    <div>
      <Title name={titleName === '-1' ? '' : titleName} />
      {dataList}
    </div>
  );
};
LineChangeCard.defaultProps = {

};
LineChangeCard.propTypes = {

};

export default LineChangeCard;
