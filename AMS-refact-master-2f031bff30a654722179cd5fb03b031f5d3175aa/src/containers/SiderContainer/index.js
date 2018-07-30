/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onOpenChange, handleClick, onSiderInitial } from '../../actions/SiderAction';
import Sider from '../../components/Sider';

const mapStateToProps = (state, props) => ({
  openKeys: state.getIn(['SiderReducer', 'openKeys']),
  selectedKeys: state.getIn(['SiderReducer', 'current']),
});
    // ... receiver


const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    onInitial: (() => dispatch(onSiderInitial({ current: 'lineBOM', openKeys: [] })))(),
    onOpenChange: (openKeys) => { dispatch(onOpenChange(openKeys)); },
    handleClick: (e) => { dispatch(handleClick(e)); },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sider);
