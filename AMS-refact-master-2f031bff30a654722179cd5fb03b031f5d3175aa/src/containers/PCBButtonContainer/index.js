import { connect } from 'react-redux';
import PCBButton from '../../components/PCBButton';
import { floorBtnClick } from '../../actions/PCBShelfMonitorAction';

const mapStateToProps = (state, props) => (
  {

  }
);

const mapDispatchToProps = (dispatch, props) => ({
  onclick: () => {
    dispatch(floorBtnClick(props));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PCBButton);
