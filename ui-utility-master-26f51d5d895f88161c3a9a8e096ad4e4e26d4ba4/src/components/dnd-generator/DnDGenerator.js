import React from 'react';
import PropTypes from 'prop-types';
import DnDStencilContainer from '../../containers/DnDStencilContainer';
import DnDDragLayer from '../dnd-drag-layer';

const mainStyles = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
};

const DnDGenerator = ({ stencilTree }) => {
  const { children } = stencilTree;
  // root element having children or only root element
  if ((children !== undefined && children.length > 0) || Object.keys(stencilTree).length !== 0) {
    return (
      <div style={mainStyles}>
        <DnDStencilContainer model={stencilTree} />
        <DnDDragLayer />
      </div>
    );
  }
  return null;
};


DnDGenerator.propTypes = {
  stencilTree: PropTypes.object.isRequired,
};

export default DnDGenerator;
