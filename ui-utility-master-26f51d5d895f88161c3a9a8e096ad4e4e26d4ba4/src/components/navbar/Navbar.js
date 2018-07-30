import React from 'react';
import PropTypes from 'prop-types';
import PageManagerToolbarContainer from '../../containers/PageManagerToolbarContainer';
import StencilListContainer from '../../containers/StencilListContainer';
import {
  gridLayoutList, materialUIList, rechartList, rtchartList, baseList,
} from '../../constants';
import styles from './navbarStyles';

import { Scrollbars } from 'react-custom-scrollbars';

const renderScrollView = (props) => (
  <div {...props}
    style={
      Object.assign({}, props.style, styles.scrollbarsView)
    }
    className="view"
  />
);
renderScrollView.propTypes = {
  style: PropTypes.object,
};
/**
 * [description]
 * @see https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/customization.md
 * @param  {[type]} ) [description]
 * @return {[type]}   [description]
 */
const Navbar = () => (
  <div style={styles.navbar}>
    <PageManagerToolbarContainer />
    <Scrollbars
      autoHide
      renderView={renderScrollView}
      style={styles.scrollbars}
    >
      <StencilListContainer title={rechartList.title} stencils={rechartList.stencils} />
      <StencilListContainer title={rtchartList.title} stencils={rtchartList.stencils} />
      <StencilListContainer title={gridLayoutList.title} stencils={gridLayoutList.stencils} />
      <StencilListContainer title={materialUIList.title} stencils={materialUIList.stencils} />
      <StencilListContainer title={baseList.title} stencils={baseList.stencils} />
    </Scrollbars>
  </div>
);

export default Navbar;
