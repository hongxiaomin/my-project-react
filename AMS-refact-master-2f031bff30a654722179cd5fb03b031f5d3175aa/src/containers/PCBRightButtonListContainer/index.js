import { connect } from 'react-redux';
import PCBRightButtonList from '../../components/PCBRightButtonList';
import { rightInitial } from '../../actions/PCBShelfMonitorAction';

const mapStateToProps = (state, props) => ({
  rightArr: state.getIn(['arrData', 'rightDate']),
});

const mapDispatchToProps = (dispatch, props) => ({
  init: (() => {
    dispatch(rightInitial(props));
  })(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PCBRightButtonList);
