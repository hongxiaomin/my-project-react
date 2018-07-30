/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onActionClick } from '../../actions/ActionBtnAction';
import { formReducerName, formOriDataSourceName } from '../../constants/Config';
import ActionBtn from '../../components/ActionBtn';


const mapStateToProps = (state, props) => {
  if (props.btnName === '隐藏') {
    const formdata = state.getIn([formReducerName, props.formName, formOriDataSourceName]);

    const active = formdata || '';
    const disabled = active.active === 'N';
    return {
      // ... receiver
      disabled,
    };
  } else if ((props.btnName === '取消隐藏')) {
    const formdata = state.getIn([formReducerName, props.formName, formOriDataSourceName]);
    const active = formdata || '';
    const disabled = active.active === 'Y';
    return {
      // ... receiver
      disabled,
    };
  }
  return {};
};
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    onClick: () => { dispatch(onActionClick(props)); },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionBtn);
