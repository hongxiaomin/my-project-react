/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onHideClick } from '../../actions/HeaderAction';

import Header from '../../components/Header';

const mapStateToProps = state => ({
  siderWidth: state.getIn(['HeaderReducer', 'siderWidth']),
});
const mapDispatchToProps = dispatch => (
  {
    // ... dispatcher
    onHideClick: () => { dispatch(onHideClick()); },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
