import { connect } from 'react-redux';
import PropertyForm from '../components/property-form';
import { openPropertySelectionModal } from '../actions';

const mapStateToProps = (state) => ({
  chartType: state.getIn(['fields', 'selectedStencil', 'name']),
});

const mapDispatchToProps = (dispatch) => ({
  openPropertySelectionModal: () => {
    dispatch(openPropertySelectionModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PropertyForm);
