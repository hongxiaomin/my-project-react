/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import BOMShowDate from '../../components/BOMShowDate';
import { formReducerName, formOriDataSourceName } from '../../constants/Config';
import { tableRedecurName } from '../../constants/TableConfig';

const mapStateToProps = (state, props) => {
  const ShowData = props.tableName ? state.getIn([tableRedecurName, props.name, 'data']) : state.getIn([formReducerName, props.name, formOriDataSourceName]);
  const { rows } = { ...ShowData };
  const { message } = { ...ShowData };
  const name = props.keyName ? props.keyName : '';
  // const data = rows ? rows[name] : '';
  let data = '';
  if (props.tableName) {
    data = rows ? rows[0][name] : '';
  } else {
    if (name === 'message') {
      data = message;
    } else {
      data = rows ? rows[name] : '';
    }
  }

  if (props.title === '状态') {
    return ({
      value: `${Math.round(data * 100)}%`,
      className: 'boxName',
      width: `${100 * data}%`,
      parentClass: 'border',
    });
  } else {
    return ({
      value: data,
    });
  }
};
export default connect(
  mapStateToProps,

)(BOMShowDate);
