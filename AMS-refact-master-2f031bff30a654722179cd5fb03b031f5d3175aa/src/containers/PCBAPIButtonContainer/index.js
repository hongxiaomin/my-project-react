import { connect } from 'react-redux';
import PCBAPIButton from '../../components/PCBAPIButton';
import { closeAllBtnClick } from '../../actions/PCBShelfMonitorAction';

const mapStateToProps = (state, props) => (
  {

  }
);

const mapDispatchToProps = (dispatch, props) => ({
  onclick: () => {
    dispatch(closeAllBtnClick(props));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PCBAPIButton);
