import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import PropertySelectionModal from '../components/property-selection-modal';
import { closePropertySelectionModal, submitSelectedProperty } from '../actions';

const mapStateToProps = (state) => ({
  propertySelectionModalOpen: state.getIn(['options', 'propertySelectionModal', 'open']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
  selectedProperty: state.getIn(['fields', 'selectedProperty']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  closePropertySelectionModal: () => {
    dispatch(closePropertySelectionModal());
  },
  onPropsSubmit: (moreProps) => {
    dispatch(submitSelectedProperty({ moreProps: fromJS(moreProps) }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PropertySelectionModal);
