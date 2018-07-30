import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navbar';
import AppbarContainer from '../../containers/AppbarContainer';
import UICanvasViewContainer from '../../containers/UICanvasViewContainer';
import StencilEditorDrawerContainer from '../../containers/StencilEditorDrawerContainer';
import StencilEditorDrawerContainer2 from '../../containers/StencilEditorDrawerContainer2';
import styles from './uiUtilityViewStyles';
import ReactTooltip from 'react-tooltip';

const UIUtilityView = ({ mode }) => (
  <div style={styles.container}>
    <AppbarContainer />
    <div style={styles.main}>
      {mode === 'edit' && <Navbar />}
      <UICanvasViewContainer />
      <StencilEditorDrawerContainer />
      <StencilEditorDrawerContainer2 />
      <ReactTooltip
        className="customReactTooltip"
        effect="solid"
        id="stencilPreview"
        place="right"
        type="dark"
      />
    </div>
  </div>
);

UIUtilityView.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default UIUtilityView;
