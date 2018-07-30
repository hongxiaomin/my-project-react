import { connect } from 'react-redux';
import StencilList from '../components/stencil-list';
import { addStencilTemplate } from '../utils';

const mapStateToProps = (state, ownProps) => ({
  stencils: ownProps.stencils,
  title: ownProps.title,
  index: state.getIn(['routing', 'index']),
  routes: state.getIn(['routing', 'routes']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  onListItemClick: (stencilName, rootId) => {
    addStencilTemplate(dispatch, stencilName, rootId);
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    // if rootId is specified, use it instead of config.ROOT_DIV_ID
    onListItemClick: (stencilName) => {
      const { index, routes } = stateProps;
      const stencils = routes[index].stencils;
      let rootId;
      for (const key in stencils) {
        if (stencils[key].parentId === null) {
          rootId = key;
        }
      }
      dispatchProps.onListItemClick(stencilName, rootId);
    },
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(StencilList);
