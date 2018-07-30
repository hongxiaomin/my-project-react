import React from 'react';
import PropTypes from 'prop-types';
import { getElementType } from 'ui-utility-code-generator/lib/utils';
import handleRadioButton from './handleRadioButton';
import { PRIMITIVE_STRING_NAMESPACE } from '../constants/config';
import DnDStencilContainer from '../containers/DnDStencilContainer';

/**
 * wrap DnD tag, but some component should not wrap
 * @param  {Object} model {...}
 * @param  {Number} index number
 * @return {Object}       DnDStencilContainer
 */
function getElementChildren(model, index) {
  let stencil = null;
  if (Array.isArray(model) === true) {
    // if stencil's children is empty array
    if (model.length === 0) {
      stencil = null;
    } else {
      const children = [];
      for (let i = 0; i < model.length; i++) {
        children.push(getElementChildren(model[i], i));
      }
      stencil = children;
    }
  } else if (typeof(model) === 'object') {
    const { namespace, name, children, props, extension } = model;
    const noWrapDnD = ({ namespaceStr, nameStr, propsFunc, childrenArray }) => (
      React.createElement(
        getElementType(namespaceStr, nameStr),
        propsFunc,
        getElementChildren(childrenArray),
      )
    );
    noWrapDnD.propTypes = {
      namespaceStr: PropTypes.string,
      nameStr: PropTypes.string,
      propsFunc: PropTypes.func,
      childrenArray: PropTypes.array,
    };
    // special component
    if (namespace === PRIMITIVE_STRING_NAMESPACE) {
      return name;
    } else if (namespace === 'material-ui' && name === 'RadioButton') {
      return handleRadioButton(model);
    } else if (!extension.dnd) {
      return noWrapDnD({
        namespaceStr: namespace,
        nameStr: name,
        propsFunc: props,
        childrenArray: children,
      });
    }
    stencil = (
      <DnDStencilContainer model={model} key={index} index={index}>
        {getElementChildren(children)}
      </DnDStencilContainer>
    );
  }
  return stencil;
}


export default getElementChildren;
