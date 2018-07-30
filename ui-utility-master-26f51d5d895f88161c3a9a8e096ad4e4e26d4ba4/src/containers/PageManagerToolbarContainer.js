import { connect } from 'react-redux';
import PageManagerToolbar from '../components/page-manager-toolbar';
import { openPageEditorModal, changePageManagerAction } from '../actions';
import { push } from 'react-router-redux';

const handler = dispatch => action => () => {
  dispatch(openPageEditorModal());
  dispatch(changePageManagerAction({ action }));
};

const mapStateToProps = (state) => ({
  routes: state.getIn(['routing', 'routes']).toJS(),
  currentPage: state.getIn(['routing', 'currentPage']),
});

const mapDispatchToProps = (dispatch) => ({
  onAddClick: handler(dispatch)('add'),
  onCloneClick: handler(dispatch)('clone'),
  onEditClick: handler(dispatch)('edit'),
  onDeleteClick: handler(dispatch)('delete'),
  onPageSwitch: (pageName) => {
    dispatch(push(pageName));   // push will trigger switchPage on middleware
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageManagerToolbar);
