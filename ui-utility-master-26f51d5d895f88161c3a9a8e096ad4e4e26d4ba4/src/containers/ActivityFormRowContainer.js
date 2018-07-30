import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import ActivityFormRow from '../components/activity-form-row';
import { resetDrawerSelectedStencil } from '../utils';
import { updateStencilProperty } from '../actions';

const mapStateToProps = (state) => ({
  routes: state.getIn(['routing', 'routes']).toJS(),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  onActivityFormSubmit: (id, pageName) => {
    const activity = { onTouchTap: [{ name: 'push', args: [pageName] }] };
    dispatch(updateStencilProperty({ id, properties: fromJS(activity), updateActivity: true }));
  },
  closeStencilEditorDrawer: () => {
    resetDrawerSelectedStencil();
  },
  onDeleteActivity: (id) => {
    dispatch(updateStencilProperty({ id, removeActivity: true }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityFormRow);
