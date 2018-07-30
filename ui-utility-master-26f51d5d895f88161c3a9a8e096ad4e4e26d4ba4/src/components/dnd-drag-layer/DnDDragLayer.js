import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import { PRIMITIVE_STRING_NAMESPACE, DRAG_LAYER_NONFUNCTIONAL } from '../../constants/config';
import { getElementType } from 'ui-utility-code-generator/lib/utils';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function collect(monitor) {
  return {
    model: monitor.getItem() !== null && monitor.getItem().model,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

function getChildren(model) {
  let stencil = null;
  if (Array.isArray(model) === true) {
    if (model.length === 0) {  // if stencil's children is empty array
      stencil = null;
    } else {
      const children = [];
      for (let i = 0; i < model.length; i++) {
        children.push(getChildren(model[i]));
      }
      stencil = children;
    }
  } else if (typeof(model) === 'object') {
    const { namespace, name, children, props } = model;
    if (namespace === PRIMITIVE_STRING_NAMESPACE) {
      return name;
    }
    stencil = (
      React.createElement(
        getElementType(namespace, name),
        props,
        getChildren(children)
      )
    );
  }
  return stencil;
}

const DnDDragLayer = ({ model, isDragging, currentOffset }) => {
  if (!isDragging) {
    return false;
  }

  const { namespace, name, props: stencilProps, children } = model;
  if (DRAG_LAYER_NONFUNCTIONAL.indexOf(name) > -1) {
    return false;
  }

  delete stencilProps.onTouchTap;
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>
        {React.createElement(
          getElementType(namespace, name),
          stencilProps,
          getChildren(children)
        )}
      </div>
    </div>
  );
};

DnDDragLayer.propTypes = {
  model: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  isDragging: PropTypes.bool.isRequired,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default new DragLayer(collect)(DnDDragLayer);
