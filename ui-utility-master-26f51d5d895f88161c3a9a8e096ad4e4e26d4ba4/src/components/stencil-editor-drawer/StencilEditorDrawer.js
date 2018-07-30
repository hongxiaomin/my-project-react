import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import StencilEditorTabs from '../stencil-editor-tabs';
import styles from './stencilEditorDrawerStyles';

const StencilEditorDrawer = ({ stencilEditorDrawerOpen }) => (
  <div>
    <Drawer
      width={styles.width}
      containerStyle={styles.container}
      openSecondary
      open={stencilEditorDrawerOpen}
    >
      <StencilEditorTabs />
    </Drawer>
  </div>
);

StencilEditorDrawer.propTypes = {
  stencilEditorDrawerOpen: PropTypes.bool.isRequired,
};

export default StencilEditorDrawer;
