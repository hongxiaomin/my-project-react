/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import HomeView from '../../components/HomeView';

const mapStateToProps = state => ({
  siderWidth: state.getIn(['HeaderReducer', 'siderWidth']),
});

export default connect(
  mapStateToProps,
)(HomeView);
