import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationArrow from 'material-ui/svg-icons/navigation/arrow-forward';
import { COLOR } from '../../constants/config';
import styles from './stencilCloneExplainModalStyles';

const StencilCloneExplainModal = ({ stencilCloneExplainModalOpen, onCloseClick }) => {
  function onClose() {
    onCloseClick();
  }

  return (
    <div>
      <Drawer width={290} open={stencilCloneExplainModalOpen} openSecondary>
        <p style={styles.title}>The difference between clone and link clone</p>
        <ul>
          <li style={styles.listTitle}>Clone</li>
          <p style={styles.text}>When you select a stencil and
            clone it to the same page or other pages,
            the current setting of that stencil will be cloned to the pages you choose,
            but all these cloned stencils are not linked,
            which means any updates to these stencils will not affect other stencils
            even they are cloned from each other.
          </p>
          <li style={styles.listTitle}>Link Clone</li>
          <p style={styles.text}>
            Link clone can only choose to other pages and cannot have same link cloned stencil
            in the same page. The difference is all link cloned stencils are linked together,
            once you update one of them no matter on which pages,
            those link cloned stencils on rest pages will also be updated.
          </p>
          <li style={styles.listTitle}>Note: Root stencil cannot be cloned</li>
        </ul>
        <FloatingActionButton mini onClick={onClose} style={styles.floatButton}
          backgroundColor={COLOR.GREY[600]}
        >
          <NavigationArrow />
        </FloatingActionButton>
        </Drawer>
    </div>
  );
};

StencilCloneExplainModal.propTypes = {
  stencilCloneExplainModalOpen: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default StencilCloneExplainModal;
