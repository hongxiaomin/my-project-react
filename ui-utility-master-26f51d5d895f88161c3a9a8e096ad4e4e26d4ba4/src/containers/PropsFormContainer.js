import { connect } from 'react-redux';

import { fromJS } from 'immutable';
import uuid from 'uuid';

import PropsForm from '../components/props-form';

import { resetDrawerSelectedStencil } from '../utils';
import {
  updateStencil,
  updateStencilProperty,
  resetSelectedProperty,
  deleteStencil,
} from '../actions';

import {
  getRightScale,
  getColProps,
} from '../components/grid-layout';

import { PRIMITIVE_STRING_NAMESPACE } from '../constants/config';
import addUnitStencil from '../utils/addUnitStencil';
import store from '../store';


const mapStateToProps = (state) => ({
  stencilEditorDrawerOpen2: state.getIn(['options', 'stencilEditorDrawer', 'open2']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
  pageIndex: state.getIn(['routing', 'index']),
  routes: state.getIn(['routing', 'routes']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  handleApplyBtn: ({ stencilId, stencilProps }) => {
    let newProps = fromJS(stencilProps);
    if (stencilProps.key === undefined) {
      newProps = newProps.mergeDeep(fromJS({ key: uuid.v4() }));
    }
    // update store
    dispatch(updateStencilProperty({
      id: stencilId,
      properties: newProps,
    }));
    // for get newest
    dispatch(resetSelectedProperty());
  },
  handleCollapseBtn: () => {
    // hide drawer & reset everything
    resetDrawerSelectedStencil();
  },
});
const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    handleApplyBtn: ({ selectedStencil, stencilId, stencilProps, stencils }) => {
      /*
      update inner, special case
      HERE are GridLayout
       */
      const revisedStencilProps = fromJS(stencilProps).toJS(); // convert back to JSON
      const dataChildrenPrimitiveString = 'data-children-primitiveString';

      if (selectedStencil.namespace === 'GridLayout') {
        const { routes, pageIndex } = stateProps;
        const children = routes[pageIndex].stencils[stencilId].children;
        // caculate them
        const gridLayoutCols = revisedStencilProps.col;
        const gridLayoutScales = getRightScale(
          revisedStencilProps.scale,
          gridLayoutCols,
        );
        // loop modify each col
        for (let i = 0, j = gridLayoutCols; i < j; i += 1) {
          if (revisedStencilProps.contentHeight[i] === undefined) {
            // give default value for drag&drop
            revisedStencilProps.contentHeight[i] = 100;
          }
          const colSelfProps = {
            ...getColProps({
              index: i,
              scale: gridLayoutScales[i],
              colAlign: revisedStencilProps.colAlign,
              colDirection: revisedStencilProps.colDirection,
              contentHeight: revisedStencilProps.contentHeight,
              contentHeightUnit: revisedStencilProps.contentHeightUnit,
              contentPadding: revisedStencilProps.contentPadding,
              contentPosition: revisedStencilProps.contentPosition,
              isEditMode: true,
            }),
          };
          // exist component or not?
          if (children[i]) {
            dispatchProps.handleApplyBtn({
              stencilId: children[i],
              stencilProps: colSelfProps,
            });
          } else {
            addUnitStencil(
              store.dispatch,
              'GridLayoutCol',
              stencilId,
              colSelfProps,
            );
          } // new or old update
        } // end for loop
        const oldCols = routes[pageIndex].stencils[stencilId].props.col;
        if (oldCols > gridLayoutCols) {
          for (let i = gridLayoutCols; i < oldCols; i += 1) {
            store.dispatch(deleteStencil({ id: children[i] }));
          }
        }// delete unwanted col
      } else if (selectedStencil.props[dataChildrenPrimitiveString]) {
        /*
        update inner, special case
        HERE are children has primitiveString object
         */
        for (const stencilModel in stencils) {
          if (stencils[stencilModel].namespace === PRIMITIVE_STRING_NAMESPACE &&
            selectedStencil.children.indexOf(stencilModel) > -1) {
            store.dispatch(
              updateStencil({
                stencil: fromJS(stencils[stencilModel]),
                value: stencilProps.toJS()[dataChildrenPrimitiveString],
              })
            );
            break;
          }
        } // loop children component
      }
      /*
      update original
       */
      dispatchProps.handleApplyBtn({ stencilId, stencilProps: revisedStencilProps });
    },
  })
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PropsForm);
