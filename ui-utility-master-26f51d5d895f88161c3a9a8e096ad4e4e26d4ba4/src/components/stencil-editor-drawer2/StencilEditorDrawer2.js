import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import StencilEditorTabs2 from '../stencil-editor-tabs2';
import styles from './stencilEditorDrawerStyles2';

const StencilEditorDrawer = ({ stencilEditorDrawerOpen2, selectedStencil }) => (
  <Drawer
    containerStyle={styles.container}
    open={stencilEditorDrawerOpen2}
    openSecondary
    width={styles.drawer.width}
    zDepth={1}
    style={styles.drawerStyle}
  >
    <StencilEditorTabs2 selectedStencil={selectedStencil} />
  </Drawer>
);

StencilEditorDrawer.displayName = 'StencilEditorDrawer';

StencilEditorDrawer.propTypes = {
  stencilEditorDrawerOpen2: PropTypes.bool.isRequired,
  selectedStencil: PropTypes.object.isRequired,
};

StencilEditorDrawer.defaultProps = {
  stencilEditorDrawerOpen2: false,
  selectedStencil: {},
};

export default StencilEditorDrawer;
