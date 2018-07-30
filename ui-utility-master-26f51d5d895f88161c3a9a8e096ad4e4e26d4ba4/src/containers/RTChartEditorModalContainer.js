import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import RTChartEditorModal from '../components/rtchart-editor-modal';
import { closeRTChartEditorModal, updateStencilProperty } from '../actions';

const mapStateToProps = (state) => ({
  rtchartEditorModalOpen: state.getIn(['options', 'rtchartEditorModal', 'open']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  closeRTChartEditorModal: () => {
    dispatch(closeRTChartEditorModal());
  },
  onDataTransformerFormSubmit: (id, props, chartType) => {
    Object.assign(props, { fields: props.dataTransformer.fields });
    Object.assign(props.dataTransformer,
      { transformer: eval(`(${props.dataTransformer.transformer})`) });
    if (chartType === 'gauge') {
      const { max, min, units, arcWidth, colorLevels } = props.dataTransformer;
      // update max, min, units, and arcWidth to chart.gauge
      Object.assign(props.chart.gauge, { max, min, units, width: arcWidth });
      // update color to chart.color.pattern, update value to chart.color.threshold.values
      const pattern = [];
      const values = [];
      for (let i = 0; i < colorLevels.length; i++) {
        pattern.push(colorLevels[i].color);
        values.push(colorLevels[i].value);
      }
      Object.assign(props.chart.color, { pattern });
      Object.assign(props.chart.color.threshold, { values });
    } else {
      const { yLines, axes } = props.dataTransformer;
      // update yAxis and upper/lower bound
      const bounds = [];
      for (let i = 0; i < yLines.length; i++) {
        if (yLines[i].type === 'yAxis') {
          Object.assign(props.chart.axis.y, { min: yLines[i].min });
          Object.assign(props.chart.axis.y, { max: yLines[i].max });
        } else {
          // if both value and text are '', keep the array empty, don't push
          if (yLines[i].value !== '' && yLines[i].text.replace(/\s/g, '').length !== 0) {
            const line = { value: yLines[i].value, text: yLines[i].text };
            bounds.push(line);
          }
        }
      }
      Object.assign(props.chart.grid.y, { lines: bounds });
      // update label of axes
      for (let i = 0; i < axes.length; i++) {
        const { type, text, position } = axes[i];
        if (type === 'xAxis') {
          Object.assign(props.chart.axis.x.label, { text, position });
        } else if (type === 'yAxis') {
          Object.assign(props.chart.axis.y.label, { text, position });
        }
      }
    }
    dispatch(updateStencilProperty({ id, properties: fromJS(props) }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RTChartEditorModal);
