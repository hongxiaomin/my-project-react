import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import uuid from 'uuid';
import PropertyFormRow from '../components/property-form-row';
import { resetDrawerSelectedStencil, addUnitStencil } from '../utils';
import {
  updateStencilProperty,
  deleteSelectedProperty,
  openReChartEditorModal,
  openRTChartEditorModal,
  openPlainTableEditorModal,
  resetSelectedProperty,
  updateStencil,
  openIconSelectorModal,
  setUsedIcon,
  deleteStencil,
  updateIconData,
  addPropsStencil,
  moveStencilOrderForwardBackward,
} from '../actions';

const mapStateToProps = (state) => ({
  iconData: state.getIn(['fields', 'iconData']).toJS(),
  pageIndex: state.getIn(['routing', 'index']),
  routes: state.getIn(['routing', 'routes']).toJS(),
  selectedProperty: state.getIn(['fields', 'selectedProperty']).toJS(),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  onPropertyFormSubmit: (id, properties) => {
    dispatch(updateStencilProperty({ id, properties: fromJS(properties) }));
    dispatch(resetSelectedProperty());
    if (properties.icon) {
      let iconValue;
      if (Object.prototype.toString.call(properties.icon) === '[object Object]') {
        iconValue = properties.icon.type.displayName;
      } else {
        iconValue = properties.icon;
      }
      dispatch(updateIconData({
        searchedText: '',
        selectedIcon: iconValue,
        oldPickedIcon: '',
        newPickedIcon: '',
      }));
    }
  },
  onIconFormSubmit: (stencil, properties) => {
    dispatch(updateStencilProperty({ id: stencil.id, properties: fromJS(properties) }));
    dispatch(updateStencil({ value: properties.icon, stencil: fromJS(stencil) }));
    dispatch(updateIconData({
      searchedText: '',
      selectedIcon: properties.icon,
      oldPickedIcon: '',
      newPickedIcon: '',
    }));
  },
  // update children: for primitiveString and icon of FloatingActionButton/IconButton
  onChildrenFormSubmit: (value, stencil) => {
    dispatch(updateStencil({ value, stencil: fromJS(stencil) }));
  },
  closeStencilEditorDrawer: () => {
    resetDrawerSelectedStencil();
  },
  onDeleteProperty: (id, properties, propNames) => {
    dispatch(updateStencilProperty({ id, properties: fromJS(properties) }));
    dispatch(deleteSelectedProperty({ propNames: fromJS(propNames) }));
  },
  onRTChartEditClick: () => {
    dispatch(openRTChartEditorModal());
  },
  onReChartEditClick: () => {
    dispatch(openReChartEditorModal());
  },
  onPlainTableEditClick: () => {
    dispatch(openPlainTableEditorModal());
  },
  onIconSelectorEditClick: (iconName, fieldName) => {
    dispatch(openIconSelectorModal());
    dispatch(setUsedIcon({ iconName, fieldName }));
  },
  deleteStencil: (stencilId) => {
    dispatch(deleteStencil({ id: stencilId }));
  },
  onMoveStencilOrder: (stencil, elementIndex, direction) => {
    dispatch(moveStencilOrderForwardBackward(
      { stencil: fromJS(stencil), elementIndex, direction })
    );
  },
  // for List to add ListItem, for RadioButtonGroup to add RadioButton
  onAddChildClick: (id, name, childrenLength) => {
    const radioButtonValue = `RadioButton${childrenLength + 1}`;
    switch (name) {
      case 'List':
        addUnitStencil(
          dispatch, 'ListItem', id,
          { primaryText: `List Item ${childrenLength + 1}`, nestedItems: [] }
        );
        break;
      case 'RadioButtonGroup':
        addUnitStencil(
          dispatch, 'Radio Button', id, { label: radioButtonValue, value: radioButtonValue }
        );
        break;
      default:
        break;
    }
  },
  // currently this is for ListItem to add nestedItems
  onAddNestedItemClick: (id, nestedItemsLength) => {
    const listItemModel = {
      id: uuid.v4(),
      namespace: 'material-ui',
      name: 'ListItem',
      props: {
        primaryText: `List Item ${nestedItemsLength + 1}`,
        nestedItems: [],
      },
      parentId: id,
      children: [],
      extension: {
        action: false,
        dataBinding: false,
      },
    };
    dispatch(addPropsStencil({ stencil: fromJS(listItemModel) }));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    onAddChildClick: (id, name) => {
      const { routes, pageIndex } = stateProps;
      const childrenLength = routes[pageIndex].stencils[id].children.length;
      dispatchProps.onAddChildClick(id, name, childrenLength);
    },
    onAddNestedItemClick: (id) => {
      const { routes, pageIndex } = stateProps;
      const nestedItemsLength = routes[pageIndex].stencils[id].props.nestedItems.length;
      dispatchProps.onAddNestedItemClick(id, nestedItemsLength);
    },
    onMoveStencilOrder: (stencil, direction) => {
      const { routes, pageIndex } = stateProps;
      const parentStencil = routes[pageIndex].stencils[stencil.parentId];
      let siblingArray;
      if (parentStencil.name === 'ListItem') {
        siblingArray = parentStencil.props.nestedItems;
      } else {
        siblingArray = parentStencil.children;
      }
      const elementIndex = siblingArray.indexOf(stencil.id);
      const siblingLength = siblingArray.length;
      // if already the first element, cannot be moved forward
      if (direction === 'forward' && elementIndex !== 0) {
        dispatchProps.onMoveStencilOrder(stencil, elementIndex, direction);
      }
      // if already the last element, cannot be moved backward
      if (direction === 'backward' && elementIndex !== siblingLength - 1) {
        dispatchProps.onMoveStencilOrder(stencil, elementIndex, direction);
      }
    },
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PropertyFormRow);
