/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onGroupSelectInitial } from '../../actions/GroupSelectAction';
import GroupSelect from '../../components/GroupSelect';
import { GUID } from '../../utils/Common';
import {
  privateReducer,
  childrenName } from '../../constants/Config';

const mapStateToProps = state => (
  {
    state,
  }
);
const mapDispatchToProps = (dispatch, props) => {
  const id = GUID();
  return {
    id,
    onInitial: (() => dispatch(onGroupSelectInitial(id, props)))(),
  };
};
const mergeProps = (stateProps, dispatchProps) => ({
  children: stateProps.state.getIn([privateReducer, dispatchProps.id, childrenName]),
  ...dispatchProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(GroupSelect);
