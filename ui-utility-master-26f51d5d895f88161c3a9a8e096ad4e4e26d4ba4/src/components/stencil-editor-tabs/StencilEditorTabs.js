import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SvgIcon from 'material-ui/SvgIcon';
import PropertyFormContainer from '../../containers/PropertyFormContainer';
import ActivityFormRowContainer from '../../containers/ActivityFormRowContainer';
import ImagePalette from 'material-ui/svg-icons/image/palette';
import ActionBuild from 'material-ui/svg-icons/action/build';
import styles from './stencilEditorTabsStyles';
import { COLOR } from '../../constants/config';

const StencilEditorTabs = () => (
  <Tabs inkBarStyle={styles.inkBar}>
    <Tab label="PROPERTY" style={styles.tab}
      icon={<SvgIcon><ImagePalette color={COLOR.GREY[600]} /></SvgIcon>}
    >
      <PropertyFormContainer />
    </Tab>
    <Tab label="ACTIVITY" style={styles.tab}
      icon={<SvgIcon><ActionBuild color={COLOR.GREY[600]} /></SvgIcon>}
    >
      <ActivityFormRowContainer />
    </Tab>
  </Tabs>
);

export default StencilEditorTabs;
