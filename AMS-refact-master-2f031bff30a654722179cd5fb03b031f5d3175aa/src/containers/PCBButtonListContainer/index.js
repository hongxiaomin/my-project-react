import { connect } from 'react-redux';
import PCBButtonList from '../../components/PCBButtonList';
import { initial } from '../../actions/PCBShelfMonitorAction';

const mapStateToProps = (state, props) => ({
  arr: state.getIn(['arrData', 'data']),
});

const mapDispatchToProps = (dispatch, props) => ({
  init: (() => {
    dispatch(initial(props));
  })(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PCBButtonList);
