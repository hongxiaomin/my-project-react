import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';
import PropertySelectionModalContainer from '../../containers/PropertySelectionModalContainer';
import RTChartEditorModalContainer from '../../containers/RTChartEditorModalContainer';
import ReChartBasicEditorModalContainer from '../../containers/ReChartBasicEditorModalContainer';
import ReChartPieEditorModalContainer from '../../containers/ReChartPieEditorModalContainer';
import ReChartRadarEditorModalContainer from '../../containers/ReChartRadarEditorModalContainer';
import ReChartRadialBarEditorModalContainer
  from '../../containers/ReChartRadialBarEditorModalContainer';
import ReChartScatterEditorModalContainer
  from '../../containers/ReChartScatterEditorModalContainer';
import ReChartComposedEditorModalContainer
  from '../../containers/ReChartComposedEditorModalContainer';
import PlainTableEditorModalContainer from '../../containers/PlainTableEditorModalContainer';
import IconSelectorModalContainer from '../../containers/IconSelectorModalContainer';
import PropertyFormRowContainer from '../../containers/PropertyFormRowContainer';
import styles from './propertyFormStyles';

function renderRechartModal(chartType) {
  switch (chartType) {
    case 'PieChart':
      return <ReChartPieEditorModalContainer />;
    case 'ScatterChart':
      return <ReChartScatterEditorModalContainer />;
    case 'ComposedChart':
      return <ReChartComposedEditorModalContainer />;
    case 'RadarChart':
      return <ReChartRadarEditorModalContainer />;
    case 'RadialBarChart':
      return <ReChartRadialBarEditorModalContainer />;
    default:
      return <ReChartBasicEditorModalContainer />;
  }
}

const PropertyForm = ({ openPropertySelectionModal, chartType }) => (
  <div>
    <div style={styles.buttonPosition}>
      <FlatButton
        label="ADD MORE"
        primary
        icon={<AddCircle />}
        style={styles.button}
        labelStyle={styles.label}
        onClick={openPropertySelectionModal}
      />
    </div>
    <PropertySelectionModalContainer />
    {renderRechartModal(chartType)}
    <RTChartEditorModalContainer />
    <PlainTableEditorModalContainer />
    <IconSelectorModalContainer />
    <PropertyFormRowContainer />
  </div>
);

PropertyForm.propTypes = {
  openPropertySelectionModal: PropTypes.func.isRequired,
  chartType: PropTypes.string,
};

export default PropertyForm;
