import { connect } from 'react-redux';
import PCBRightButton from '../../components/PCBRightButton';
import { shelfBtnClick } from '../../actions/PCBShelfMonitorAction';

const mapStateToProps = (state, props) => (
  {

  }
);

const mapDispatchToProps = (dispatch, props) => ({
  onclick: () => {
    dispatch(shelfBtnClick(props));
    // dispatch(leftInitial(props));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PCBRightButton);
