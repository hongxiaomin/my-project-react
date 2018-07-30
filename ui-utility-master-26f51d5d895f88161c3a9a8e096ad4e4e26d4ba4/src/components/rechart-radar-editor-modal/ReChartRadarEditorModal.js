import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ColorPickerTextField from '../color-picker-textfield';
import styles from './rechartRadarEditorModalStyles';
import { renderRechartInCommon } from '../../utils';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
const { getHint, getTransformerEditor,
  getURLInput, getActionButtons, isEmpty } = renderRechartInCommon;

const DefaultTextField = props => (
  <TextField floatingLabelFixed style={styles.twinTextField} inputStyle={styles.text}
    floatingLabelStyle={styles.singleFloatingLabel} type="text" {...props}
  />
);

DefaultTextField.propTypes = {
  needLeftSpace: PropTypes.bool,
};

export default class ReChartRadarEditorModal extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTransformerChange = this.onTransformerChange.bind(this);
    this.state = {
      dataTransformer: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const { props } = nextProps.selectedStencil;
    if (nextProps.rechartEditorModalOpen && !this.props.rechartEditorModalOpen) {
      this.setState({
        dataTransformer: props.dataTransformer,
      });
    }
  }

  onCancel = () => {
    this.props.closeReChartEditorModal();
    this.setState({
      dataTransformer: {},
    });
  }

  onSubmit = () => {
    const { props, id } = this.props.selectedStencil;
    Object.assign(props, { dataTransformer: this.state.dataTransformer });
    this.props.onDataTransformerFormSubmit(id, props);
    this.props.closeReChartEditorModal();
    this.setState({
      dataTransformer: {},
    });
  }

  onChange = (key, index, type) => (event, isChecked) => {
    if (key === 'legend') {
      this.state.dataTransformer[key] = isChecked;
    } else if (index !== undefined) {
      this.state.dataTransformer[type][index][key] = event.target.value;
    } else {
      this.state.dataTransformer[key] = event.target.value;
    }
    this.setState(
      this.state.dataTransformer
    );
  }
  /**
   * color change for color picker event
   * @param  {Any} key
   * @param  {Number} index
   * @param  {String} type
   * @param  {Object} color
   * @param  {Object} event
   */
  onColorChange = (key, index, type) => (color) => {
    const hex = color.hex;

    if (index !== undefined) {
      this.state.dataTransformer[type][index][key] = hex;
    } else {
      this.state.dataTransformer[key] = hex;
    }
    this.setState(
      this.state.dataTransformer
    );
  }

  onTransformerChange(value) {
    this.state.dataTransformer.transformer = value;
    this.setState(
      this.state.dataTransformer
    );
  }

  render() {
    const { chartType } = this.props;
    const {
      url, transformer, legend, legendName,
      color, outerRadius, radarKey, angleKey,
    } = this.state.dataTransformer;

    return (
      <Dialog
        actions={getActionButtons(url, this.onCancel, this.onSubmit)}
        modal={false}
        onRequestClose={this.onCancel}
        open={this.props.rechartEditorModalOpen}
        autoScrollBodyContent
        contentStyle={{ width: '70%', maxWidth: 'none' }}
      >
        {Object.keys(this.state.dataTransformer).length !== 0 &&
          <div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 50 }}>
                {getURLInput(url, this.onChange)}
                <div style={{ marginTop: 10, display: 'flex' }}>
                  <DefaultTextField floatingLabelText="Radar Key"
                    value={radarKey} onChange={this.onChange('radarKey')}
                    errorText={isEmpty(radarKey).hint}
                    errorStyle={isEmpty(radarKey).style}
                  />
                  <DefaultTextField floatingLabelText="Angle Key"
                    value={angleKey} onChange={this.onChange('angleKey')}
                    errorText={isEmpty(angleKey).hint}
                    errorStyle={isEmpty(angleKey).style}
                  />
                </div>
              </div>
              <div style={{ flex: 1, marginLeft: 65 }}>
                <div style={{ marginTop: 5 }}>
                  <DefaultTextField floatingLabelText="outerRadius"
                    value={outerRadius} onChange={this.onChange('outerRadius')}
                  />
                  <ColorPickerTextField
                    TextField={
                      <DefaultTextField floatingLabelText="Color" value={color}
                        onChange={this.onChange('color')} style={{ marginLeft: 10, width: 150 }}
                      />
                    }
                    colorValue={color}
                    onChange={this.onColorChange('color')}
                  />
                </div>
                <div style={{ display: 'flex', marginTop: 10, marginBottom: 15 }}>
                  <DefaultTextField floatingLabelText="Legend Name"
                    floatingLabelStyle={styles.singleFloatingLabel}
                    value={legendName} style={styles.twinTextField}
                    onChange={this.onChange('legendName')}
                    errorText={'Legend name is required if you want to show legend'}
                    errorStyle={styles.hint}
                  />
                  <Checkbox style={{ width: 165, marginTop: 35 }}
                    label={'Show Legend'} checked={legend} onCheck={this.onChange('legend')}
                  />
                </div>
              </div>
            </div>
            {getTransformerEditor(transformer, this.onTransformerChange)}
            {getHint(chartType)}
          </div>
        }
      </Dialog>
    );
  }
}

ReChartRadarEditorModal.propTypes = {
  rechartEditorModalOpen: PropTypes.bool.isRequired,
  closeReChartEditorModal: PropTypes.func.isRequired,
  onDataTransformerFormSubmit: PropTypes.func.isRequired,
  chartType: PropTypes.string,
  selectedStencil: PropTypes.object.isRequired,
};
