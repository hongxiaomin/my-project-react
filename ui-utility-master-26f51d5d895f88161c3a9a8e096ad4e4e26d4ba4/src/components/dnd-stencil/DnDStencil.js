import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { getElementType } from 'ui-utility-code-generator/lib/utils';
import { getElementChildren, getWrapperStyle, getEditPropHelper } from '../../utils';
import {
  ROOT_DIV_ID, ITEM_TYPE, VALID_DROP_TARGET, DRAG_LAYER_NONFUNCTIONAL,
} from '../../constants/config';
import cssStyles from './dnDStencilStyles';
/*
DragSource

Wrap your component with DragSource to make it draggable. DragSource is a higher-order component
accepting three required parameters. They are described in detail below.
 */
const stencilSource = {
  beginDrag(props, monitor, component) {
    return {
      model: props.model,
      index: props.index,
      dragBoundingRect: findDOMNode(component).getBoundingClientRect(),
    };
  },
};
/*
DropTarget

Wrap your component with DropTarget to make it react to the compatible items being dragged,
hovered, or dropped on it. DropTarget is a higher-order component.
 */
const stencilTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const { id: dragId, parentId: sourceParent } = monitor.getItem().model;
    const { id: hoverId, parentId: targetParent } = props.model;
    // this function is for changeStencilOrder under same parent
    // if source and target don't have same parent, skip
    if (sourceParent !== targetParent) {
      return;
    }

    // Don't replace items with themselves
    if (dragId === hoverId) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    /*
    Get vertical/horizontal middle, use / 2

    Tune sensitivity small, use / 4
     */
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;
    // const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels from mouse position to the hover component's top/left
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items height/width

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Dragging leftwards
    // if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
    //   return;
    // }

    // Dragging rightwards
    // if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
    //   return;
    // }

    // Time to actually perform the action
    // comment out leftwards and rightwards to avoid changeStencilOrder difficultly
    props.changeStencilOrder(dragId, hoverId);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // the original code of next line is: monitor.getItem().index = hoverIndex;
    Object.assign(monitor.getItem(), { index: hoverIndex });
  },
  // drop(props, monitor, component) {
  drop(props, monitor) {
    /*
    monitor.didDrop() === true means a nested target has already handled the drop
    this happens when nested drop targets

    If any component drop on one, it will trigger. Even if in nested structure.
    This drop event will be called, show it monitor.didDrop() on which

    @see http://react-dnd.github.io/react-dnd/docs-drop-target.html
     */
    if (monitor.didDrop()) {
      return;
    }

    const { id: dragId, parentId: sourceParent } = monitor.getItem().model;
    const { id: hoverId, name: hoverName } = props.model;

    // avoid add drag source to same hover target, will duplicate same stencil
    // hoverId === monitor.getItem().model.parentId means drop inside original parent
    if (hoverId === sourceParent) {
      return;
    }

    // const dragBoundingRect = monitor.getItem().dragBoundingRect;
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // const dragBounding = {
    //   x1: monitor.getSourceClientOffset().x,
    //   y1: monitor.getSourceClientOffset().y,
    //   x2: monitor.getSourceClientOffset().x + dragBoundingRect.width,
    //   y2: monitor.getSourceClientOffset().y + dragBoundingRect.height,
    // };
    // when dragSource is totally inside dropTarget
    // and dropTarget should be one of validDropTarget, do changeStencilParent
    // const isValidDropTarget = VALID_DROP_TARGET.indexOf(hoverName);
    // if (dragBounding.x1 > hoverBoundingRect.left && dragBounding.x2 < hoverBoundingRect.right &&
    //   dragBounding.y1 > hoverBoundingRect.top && dragBounding.y2 < hoverBoundingRect.bottom &&
    //   isValidDropTarget > -1) {
    //   props.changeStencilParent(dragId, hoverId);
    // }
    /*
    put them in if mouse inner a container, but have to set their CSS - overflow: auto

    could not drop self & GridLayout could not put its inner GridLayoutCol
     */
    if (VALID_DROP_TARGET.indexOf(hoverName) > -1 && dragId !== hoverId
      && dragId !== props.model.parentId) {
      props.changeStencilParent(dragId, hoverId);
    }
  },
};

function dragCollect(connect) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  };
}
/*
@see http://react-dnd.github.io/react-dnd/docs-drop-target.html
 */
function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    draggedComponent: (() => {
      const obj = monitor.getItem();

      return obj && obj.model;
    })(),
    dropTargetHighlighted: monitor.canDrop(),
    dropTargetHovered: monitor.isOver(monitor.isOver({ shallow: true })),
  };
}

// if pure function, component is null in beginDrag, cannot getBoundingClientRect()
class DnDStencil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDbSelected: false,
    };
  }

  componentDidMount() {
    // if match DRAG_LAYER_NONFUNCTIONAL string, use its own dragPreview
    if (DRAG_LAYER_NONFUNCTIONAL.indexOf(this.props.model.name) > -1) {
      return;
    }
    // otherwise, use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    const doubleSelectedModelId = nextProps.doubleSelectedStencilModelId;

    if (doubleSelectedModelId === '' || (doubleSelectedModelId !== this.props.model.id)) {
      this.setState({ isDbSelected: false });
    }
  }

  onMouseDown() {
    return {
      onMouseDown: (event) => {
        event.stopPropagation();
      },
    };
  }

  onDoubleClick(id) {
    const clickId = id === undefined ? this.props.model.id : id;

    return {
      onDoubleClick: (event) => {
        event.stopPropagation();
        // this.props.openStencilEditorDrawer(clickId);

        /*
        temp way:
        defined component go new 4tabs
         */
        const newComponents = `GridLayout,iframe,div,h1,h2,h3,h4,h5,h6,p,text,img,
        AppBar,AutoComplete`.replace(/\r|\n|\s/g, '');
        // const newComponents = 'GridLayout,iframe,PlainTable';
        if (newComponents.indexOf(this.props.model.name) > -1) {
          this.props.openStencilEditorDrawer2(clickId);
        } else {
          this.props.openStencilEditorDrawer(clickId);
        }
        // mark stencil clicked | selected
        this.setState({ isDbSelected: true });
        this.props.setDoubleSelectedStencil(clickId);
      },
    };
  }
  /**
   * merge css style if could be dropped
   * @param  {Boolean} isNowDroppedTarget    [description]
   * @param  {Boolean} isAllowedDoppedTarget [description]
   * @param  {[type]}  modelId               [description]
   * @return {[type]}                        [description]
   */
  getMergeHintCouldDroppedStyle(isNowDroppedTarget, isAllowedDoppedTarget, model) {
    const style = {
      style: Object.assign(
        {},
        model.props.style,
        model.name !== 'GridLayout' && isNowDroppedTarget && isAllowedDoppedTarget &&
          cssStyles.allowedDropPosition,
        // model.name !== 'GridLayout' && isNowDroppedTarget && !isAllowedDoppedTarget &&
        //   cssStyles.notAllowedDropPosition,
      ),
    };

    return style;
  }
  /**
   * get wrap DnD stencil element
   * @param  {[type]} options.connectDragSource       [description]
   * @param  {[type]} options.connectDropTarget       [description]
   * @param  {[type]} options.namespace               [description]
   * @param  {[type]} options.name                    [description]
   * @param  {[type]} options.model                   [description]
   * @param  {[type]} options.props                   [description]
   * @param  {[type]} options.children                [description]
   * @param  {[type]} options.isNowDroppedTarget      [description]
   * @param  {[type]} options.isAllowedDoppedTarget   [description]
   * @param  {[type]} options.editPropHelperClassName [description]
   * @return {[type]}                                 [description]
   */
  getDnDStencil({
    connectDragSource,
    connectDropTarget,
    namespace,
    name,
    model,
    props,
    children,
    isNowDroppedTarget,
    isAllowedDoppedTarget,
    editPropHelperClassName,
  }) {
    const self = this;
    const modifiedProps = Object.assign({}, props);
    let componentWidth = props.style && props.style.width;
    if (componentWidth) {
      componentWidth = /\D+/.test(String(componentWidth).trim()) ?
        componentWidth : `${componentWidth}px`;
      modifiedProps.style.width = componentWidth;
    }
    let componentHeight = props.style && props.style.height;
    if (componentHeight) {
      componentHeight = /\D+/.test(String(componentHeight).trim()) ?
        componentHeight : `${componentHeight}px`;
      modifiedProps.style.height = componentHeight;
    }

    const wrapDnD = connectDragSource(connectDropTarget(
      React.createElement(
        'div',
        Object.assign(
          {},
          { className: [editPropHelperClassName, props.className].join(' ') },
          // getWrapperStyle(namespace, name, this.state.isDbSelected),
          {
            style: Object.assign(
              {},
              getWrapperStyle(
                namespace,
                name,
                this.state.isDbSelected
              ).style,
              { width: componentWidth },
              { height: componentHeight },
            ),
          },
          this.onMouseDown(),
          this.onDoubleClick(),
        ),
        [
          /*
          add more btn for edit its props?
           */
          getEditPropHelper({
            model,
            self,
            editPropHelperClassName,
          }),
          // user stencil by dragged
          React.createElement(
            getElementType(namespace, name),
            Object.assign(
              {},
              // props,
              modifiedProps,
              this.getMergeHintCouldDroppedStyle(
                isNowDroppedTarget,
                isAllowedDoppedTarget,
                model,
              ),
            ),
            getElementChildren(children)
          ),
        ],
      )
    ));

    return wrapDnD;
  }
  /**
   * check is the same component or not
   * @param  {[type]}  slefNamespace [description]
   * @param  {[type]}  selfName      [description]
   * @param  {[type]}  pageIndex     [description]
   * @param  {[type]}  parentId      [description]
   * @return {Boolean}               [description]
   */
  isTheSameComponent(slefNamespace, selfName, pageIndex, parentId) {
    let isTheSame = false;
    const obj = this.props.routes[pageIndex].stencils[parentId];

    if (obj && obj.namespace === slefNamespace && obj.name === selfName) {
      isTheSame = true;
    }

    return isTheSame;
  }
  // create element to nestedItems of nestedItems of nestedItems.......
  // nestedItems don't be wrapped by dnd since dnd can only accept native tag
  // but nestedItems don't accept div tag, conflict, direct render by React.createElement
  renderNestedItemsToElement(props) {
    const currentProps = props;
    delete currentProps.onTouchTap;

    for (let i = 0; i < currentProps.nestedItems.length; i++) {
      const { id: nestedItemId, props: nestedItemProps } = currentProps.nestedItems[i];
      this.renderNestedItemsToElement(nestedItemProps);
      currentProps.nestedItems[i] = (
        React.createElement(
          getElementType('material-ui', 'ListItem'),
          Object.assign(
            {}, nestedItemProps, this.onDoubleClick(nestedItemId), this.onMouseDown(nestedItemId),
          ),
        )
      );
    }
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      draggedComponent,
      dropTargetHighlighted,
      dropTargetHovered,
      model,
      routes,
      pageIndex,
    } = this.props;
    const {
      children,
      id,
      name,
      namespace,
      parentId,
      props,
      alias,
    } = model;
    // this key only bind on Material-UI component, div not has it
    delete props.onTouchTap;
    // // this key bind on native html tag, not exist, but for prop setting
    // delete props.childrenString;

    // ListItem's nestedItems is array of ListItem element, create now
    // ListItem and RadioButton should not be draggable, use arrows to change order
    if (name === 'ListItem') {
      this.renderNestedItemsToElement(props);
      return React.createElement(
        getElementType('material-ui', 'ListItem'),
        Object.assign(
          {}, props, this.onDoubleClick(id), this.onMouseDown(id),
        ),
      );
    }
    /*
    root has no helper component (it will broken size), it just a canvas
     */
    if (id === ROOT_DIV_ID || alias === 'ROOT_DIV') {
      return connectDropTarget(
        React.createElement(
          getElementType(namespace, name),
          Object.assign({}, props, this.onDoubleClick(), this.onMouseDown()),
          getElementChildren(children)
        )
      );
    }

    const isNowDroppedTarget = dropTargetHighlighted && dropTargetHovered &&
      (draggedComponent.name !== name);
    const isAllowedDoppedTarget = VALID_DROP_TARGET.indexOf(name) > -1;
    const editPropHelperClassName = `DnDHelper_${id}`;
    let dnd;
    if (namespace === 'GridLayout') {
      const isTheNestedContainer = this.isTheSameComponent(
        namespace,
        name,
        pageIndex,
        this.props.routes[pageIndex].stencils[parentId].parentId
      );
      const TOTAL_GRID_COL = 12;
      const gridLayoutId = routes[pageIndex].stencils[id].parentId;
      const gridLayoutCol = routes[pageIndex].stencils[gridLayoutId].props.col;
      const wrapDivDefaultWidth = `${100 / gridLayoutCol}%`;
      const wrapDivDefinedWidth = `${100 / TOTAL_GRID_COL * props.scale}%`;

      if (name === 'Col') {
        // no connectDragSource
        dnd = connectDropTarget(
          React.createElement(
            'div',
            Object.assign(
              {
                style: Object.assign(
                  {},
                  {
                    width: props.scale === undefined ? wrapDivDefaultWidth : wrapDivDefinedWidth,
                  },
                  props.colAlign.alignSelf && {
                    alignSelf: props.colAlign.alignSelf,
                  },
                ),
              },
            ),
            React.createElement(
              getElementType(namespace, name),
              Object.assign(
                {},
                props,
                {
                  /*
                  for wrap in dnd
                  scale setting, to fit max width
                   */
                  xs: TOTAL_GRID_COL,
                  sm: TOTAL_GRID_COL,
                  md: TOTAL_GRID_COL,
                  lg: TOTAL_GRID_COL,
                },
                this.getMergeHintCouldDroppedStyle(
                  isNowDroppedTarget,
                  isAllowedDoppedTarget,
                  model,
                ),
              ),
              getElementChildren(children)
            )
          )
        );
      } else {
        /*
        if namespace === 'GridLayout', but name is not col

        fix inner container auto width for nested nested nested...
         */
        if (isTheNestedContainer) {
          const self = this;
          dnd = connectDragSource(connectDropTarget(
            React.createElement(
              'div',
              Object.assign(
                {},
                { className: [editPropHelperClassName, props.className].join(' ') },
                {
                  style: Object.assign(
                    {},
                    getWrapperStyle(
                      namespace,
                      name,
                      this.state.isDbSelected
                    ).style,
                    { width: '100%' },
                  ),
                },
                this.onMouseDown(),
                this.onDoubleClick(),
              ),
              [
                // if add more btn for edit its props?
                getEditPropHelper({
                  model,
                  self,
                  editPropHelperClassName,
                }),
                // user stencil by dragged
                React.createElement(
                  getElementType(namespace, name),
                  props,
                  getElementChildren(children)
                ),
              ],
            )
          ));
        } else {
          // normal case
          dnd = this.getDnDStencil({
            connectDragSource,
            connectDropTarget,
            namespace,
            name,
            model,
            props,
            children,
            isNowDroppedTarget,
            isAllowedDoppedTarget,
            editPropHelperClassName,
          });
        } // end if is not isTheNestedContainer
      } // end if is not col component
    } else {
      // normal case
      dnd = this.getDnDStencil({
        connectDragSource,
        connectDropTarget,
        namespace,
        name,
        model,
        props,
        children,
        isNowDroppedTarget,
        isAllowedDoppedTarget,
        editPropHelperClassName,
      });
    }

    return dnd;
  }
}

DnDStencil.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
  index: PropTypes.number,
  routes: PropTypes.array,
  pageIndex: PropTypes.number,
  openStencilEditorDrawer: PropTypes.func.isRequired,
  openStencilEditorDrawer2: PropTypes.func.isRequired,
  setDoubleSelectedStencil: PropTypes.func.isRequired,
  draggedComponent: PropTypes.object,
  dropTargetHighlighted: PropTypes.bool,
  dropTargetHovered: PropTypes.bool,
};

const Drag = new DragSource(ITEM_TYPE.STENCIL, stencilSource, dragCollect);
const Drop = new DropTarget(ITEM_TYPE.STENCIL, stencilTarget, dropCollect);
export default flow(Drag, Drop)(DnDStencil);
