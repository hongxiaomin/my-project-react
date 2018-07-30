import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PageEditorModal from '../components/page-editor-modal';
import { ROOT_DIV } from '../constants/config';
import { closePageEditorModal, addPageAndRoot,
  clonePage, editPageName, deletePage } from '../actions';

const mapStateToProps = (state) => ({
  pageEditorModalOpen: state.getIn(['options', 'pageEditorModal', 'open']),
  pageManagerAction: state.getIn(['options', 'pageManagerAction']),
  currentPage: state.getIn(['routing', 'currentPage']),
  routes: state.getIn(['routing', 'routes']).toJS(),
  index: state.getIn(['routing', 'index']),
});

const mapDispatchToProps = (dispatch) => ({
  closePageEditorModal: () => {
    dispatch(closePageEditorModal());
  },
  onNewPageSubmit: (pageName) => {
    dispatch(addPageAndRoot({ pageName, stencil: ROOT_DIV }));
    dispatch(push(pageName));        // push will trigger switchPage on middleware
  },
  onClonePageSubmit: (pageName) => {
    dispatch(clonePage({ pageName }));
    dispatch(push(pageName));
  },
  onEditPageNameSubmit: (pageName) => {
    dispatch(editPageName({ pageName }));
    dispatch(push(pageName));
  },
  onDeletePageSubmit: (firstPageName) => {
    // delete page will always go to the first page of routes
    dispatch(deletePage());
    dispatch(push(firstPageName));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmitClick: (pageName) => {
      const { pageManagerAction } = stateProps;
      if (pageManagerAction === 'add') {
        dispatchProps.onNewPageSubmit(pageName);
      } else if (pageManagerAction === 'clone') {
        dispatchProps.onClonePageSubmit(pageName);
      } else if (pageManagerAction === 'edit') {
        dispatchProps.onEditPageNameSubmit(pageName);
      } else if (pageManagerAction === 'delete') {
        let firstPageName;
        // delete page will always go to the first page of routes
        // but if delete the (index === 0) page, the new first page will be index === 1
        if (stateProps.index === 0 && stateProps.routes.length !== 1) {
          firstPageName = stateProps.routes[1].path;
        } else {
          firstPageName = stateProps.routes[0].path;
        }
        dispatchProps.onDeletePageSubmit(firstPageName);
      }
    },
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PageEditorModal);
