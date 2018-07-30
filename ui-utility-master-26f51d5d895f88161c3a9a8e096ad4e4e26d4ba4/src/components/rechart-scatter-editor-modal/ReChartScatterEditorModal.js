import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import ColorPickerTextField from '../color-picker-textfield';
import styles from './rechartScatterEditorModalStyles';
import { RECHART_SCATTER_SHAPE } from '../../constants/config';
import { renderRechartInCommon } from '../../utils';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
const { getHint, getTransformerEditor,
  getURLInput, getActionButtons, isEmpty } = renderRechartInCommon;

const DefaultTextField = props => (
  <TextField floatingLabelFixed style={styles.twinTextField} inputStyle={styles.text}
    floatingLabelStyle={styles.floatingLabel} type="text" {...props}
  />
);

const DefaultSelectField = props => (
  <SelectField style={styles.twinTextField} floatingLabelStyle={styles.singleFloatingLabel}
    menuStyle={{ marginTop: 20 }} {...props}
  />
);

DefaultTextField.propTypes = {
  needLeftSpace: PropTypes.bool,
};

export default class ReChartScatterEditorModal extends Component {
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

  onSelectFieldChange = (key) => (event, index, value) => {
    this.state.dataTransformer[key] = value;
    this.setState(
      this.state.dataTransformer
    );
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
      url, transformer, legend,   // for every rechart
      color, xAndY, shape, legendName, axes,
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
                <div style={{ marginTop: 5, display: 'flex' }}>
                  <DefaultSelectField floatingLabelText="Dot Shape" value={shape}
                    onChange={this.onSelectFieldChange('shape')} style={{ width: 150 }}
                  >
                    {RECHART_SCATTER_SHAPE.map((type, i) =>
                      <MenuItem key={i} value={type} primaryText={type} />
                    )}
                  </DefaultSelectField>
                  <ColorPickerTextField
                    TextField={
                      <DefaultTextField floatingLabelText="Color"
                        value={color} floatingLabelStyle={styles.singleFloatingLabel}
                        onChange={this.onChange('color')} style={{ marginLeft: 10, width: 150 }}
                      />
                    }
                    colorValue={color}
                    onChange={this.onColorChange('color')}
                  />
                </div>
                <div style={{ marginLeft: -20, marginTop: -5 }}>
                  <Subheader style={styles.subheader}>axes Label</Subheader>
                  <div style={styles.textFieldContainer}>
                    <DefaultTextField floatingLabelText={axes[0].type}
                      value={axes[0].text}
                      style={styles.twinTextField}
                      onChange={this.onChange('text', 0, 'axes')}
                    />
                    <DefaultTextField floatingLabelText={axes[1].type}
                      value={axes[1].text}
                      style={styles.twinTextField}
                      onChange={this.onChange('text', 1, 'axes')}
                    />
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, marginTop: 5 }}>
                {xAndY.map((axis, index) =>
                  <div key={index} style={{ marginLeft: 75 }}>
                    <Subheader style={styles.subheader}>{axis.axis}</Subheader>
                    <div style={{ marginLeft: 20, marginTop: -25, display: 'flex' }}>
                      <DefaultTextField floatingLabelText="Key"
                        value={axis.key} style={styles.tripletTextField}
                        onChange={this.onChange('key', index, 'xAndY')}
                        errorText={isEmpty(xAndY[index].key).hint}
                        errorStyle={isEmpty(xAndY[index].key).style}
                      />
                      <DefaultTextField floatingLabelText="Name"
                        value={axis.name} style={styles.tripletTextField}
                        onChange={this.onChange('name', index, 'xAndY')}
                      />
                      <DefaultTextField floatingLabelText="Unit"
                        value={axis.unit} style={styles.tripletTextField}
                        onChange={this.onChange('unit', index, 'xAndY')}
                      />
                    </div>
                  </div>
                )}
                <div style={{ marginLeft: 95, display: 'flex', marginBottom: 15 }}>
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

ReChartScatterEditorModal.propTypes = {
  rechartEditorModalOpen: PropTypes.bool.isRequired,
  closeReChartEditorModal: PropTypes.func.isRequired,
  onDataTransformerFormSubmit: PropTypes.func.isRequired,
  chartType: PropTypes.string,
  selectedStencil: PropTypes.object.isRequired,
};
