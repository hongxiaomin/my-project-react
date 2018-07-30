import { connect } from 'react-redux';
import PCBLeftList from '../../components/PCBLeftSmallBoxList';
import { leftInitial, closeBox } from '../../actions/PCBShelfMonitorAction';

const mapStateToProps = (state, props) => ({
  leftArr: state.getIn(['arrData', 'leftDate']),
  mode: state.getIn(['arrData', 'nodeHide']),
});
const mapDispatchToProps = (dispatch, props) => ({
  init: (() => {
    dispatch(leftInitial(props));
  })(),
  close: () => {
    dispatch(closeBox('none'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PCBLeftList);
