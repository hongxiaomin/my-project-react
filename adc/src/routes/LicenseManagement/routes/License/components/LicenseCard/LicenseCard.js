import React from 'react'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { Input, InputNumber, Icon, Radio } from 'antd'
import { connect } from 'react-redux'
import 'react-table/react-table.css'
import classes from './LicenseCard.scss'
import { trainingOrJudging, getLicense, activate, save } from '../../modules/'

const RadioGroup = Radio.Group
type Props = {
  dispatch: Function,
  item: Array,
}

export class LicenseCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTrainingOrJudging: this.props.item.isTrainingDevice,
      defaultValue: '',
      inputString: '',
      name: this.props.item.name || '',
      isEdit: false,
    }
    this.tmp = []
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', this.state.isTrainingOrJudging, nextProps.item.isTrainingDevice)
    if (this.state.isTrainingOrJudging !== nextProps.item.isTrainingDevice) {
      this.setState({
        isTrainingOrJudging: nextProps.item.isTrainingDevice,
      })
    }
    this.setState({
      name: nextProps.item.name,
    })
  }

  onChange = (e) => {
    if (this.props.item.isActivate === false) {
      this.setState({
        isTrainingOrJudging: e.target.value,
      })
    } else {
      this.setState({
        isTrainingOrJudging: e.target.value,
      })
      this.props.dispatch(trainingOrJudging({ id: this.props.item.id,
        isTrainingDevice: e.target.value }))
    }
  }

  getLicense = () => {
    this.tmp = Object.assign([], this.props.item.deviceGpus)
    const tmp = {
      id: this.props.item.id,
      deviceGpus: this.tmp,
      deviceHash: this.props.item.deviceHash,
    }
    this.props.dispatch(getLicense(tmp))
  }

  handleChange = (type, keyIndex) => (e) => {
    this.tmp = Object.assign([], this.props.item.deviceGpus)
    this.tmp.forEach((item) => {
      if (keyIndex === item.id) {
        if (type === 'judging') {
          item.judgingServiceCount = e.toString()
          item.id = item.id.toString()
        } else {
          item.trainingServiceCount = e.toString()
          item.id = item.id.toString()
        }
      }
    })
  }
  blur = (type, keyIndex) => (e) => {
    this.tmp = Object.assign([], this.props.item.deviceGpus)
    this.tmp.forEach((item) => {
      if (keyIndex.toString() === item.id) {
        if (type === 'judging') {
          item.judgingServiceCount = e.target.value.toString()
        } else {
          item.trainingServiceCount = e.target.value.toString()
        }
        item.id = item.id.toString()
      }
    })
  }
  handleChangeOtherString = (e) => {
    this.setState({
      inputString: e.target.value,
    })
  }
  activate = () => {
    if (!this.props.item.license) return
    const tmp = {
      id: this.props.item.id.toString(),
      license: this.state.inputString,
      deviceGpus: this.tmp,
      deviceHash: this.props.item.deviceHash,
      isTrainingDevice: this.state.isTrainingOrJudging,
    }

    this.props.dispatch(activate(tmp))
  }

  edit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    })
  }

  save = () => {
    const tmp = {
      id: this.props.item.id.toString(),
      name: this.state.name,
    }
    this.props.dispatch(save(tmp, () => {
      this.setState({
        isEdit: false,
      })
    }))
  }

  closeSave = () => {
    this.setState({
      isEdit: false,
      name: this.props.item.name,
    })
  }
  handleChangeDeviceName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  props: Props
  render() {
    console.log('training', this.state.isTrainingOrJudging)
    const { intl } = this.props

    return (
      <div style={{ boxShadow: '6px 6px #ccc', border: '1px solid #ccc', marginTop: '30px', borderRadius: '5px' }}>
        <div style={{ display: 'flex', backgroundColor: '#f7f7f7', justifyContent: 'space-between', paddingRight: '20px' }}>
          <div className={classes.top}><div><WrapperFormattedMessage id='device' />{this.props.item.id}</div>：
            {this.state.isEdit
              ? (<Input
                style={{
                  display: 'inline-block',
                  width: 'auto',
                  marginTop: '16px',
                }}
                value={this.state.name}
                onChange={this.handleChangeDeviceName}
              />)
              : <span title={this.state.name} style={{ width: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{this.state.name}</span>
            }
          </div>
          {this.state.isEdit
            ? <div><Icon
              type="check"
              style={{ width: '20px', height: '20px', margin: '20px 10px 0 0', fontSize: '20px', cursor: 'pointer' }}
              onClick={this.save}
              disabled={this.props.item.isActivate}
              title={intl.formatMessage({ id: 'Save' })}
            />
              <Icon
                type="close-circle-o"
                style={{ width: '20px', height: '20px', marginTop: '20px', fontSize: '20px', cursor: 'pointer' }}
                onClick={this.closeSave}
                disabled={this.props.item.isActivate}
                title={intl.formatMessage({ id: 'cancel' })}
              /></div>
            : <Icon
              type="edit"
              style={{ width: '20px', height: '20px', marginTop: '20px', fontSize: '20px', cursor: 'pointer' }}
              onClick={this.edit}
              disabled={this.props.item.isActivate}
              title={intl.formatMessage({ id: 'edit' })}
            />
          }
        </div>
        <div>
          <div className={classes.hash}>Device Hash：{this.props.item.deviceHash}</div>
          <div className={classes.num}>
            <div>
              {
                this.props.item.deviceGpus && this.props.item.deviceGpus.map((item, index) => {
                  return (
                    <div key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                      <div><WrapperFormattedMessage id='gpuId' />：{item.gpuId}</div>
                      <div style={{ marginLeft: '20px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <div><WrapperFormattedMessage id='judgingService' />：</div>
                        <InputNumber
                          min={0}
                          step={1}
                          disabled={this.props.item.isActivate}
                          defaultValue={item.judgingServiceCount}
                          onChange={this.handleChange('judging', item.id)}
                          onBlur={this.blur('judging', item.id)}
                          style={{ width: '100px', marginLeft: '20px' }}
                        />
                      </div>
                      <div style={{ marginLeft: '20px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <div><WrapperFormattedMessage id='trainingService' />：</div>
                        <InputNumber
                          min={0}
                          step={1}
                          disabled={this.props.item.isActivate}
                          defaultValue={item.trainingServiceCount}
                          onChange={this.handleChange('training', item.id)}
                          onBlur={this.blur('training', item.id)}
                          style={{ width: '100px', marginLeft: '20px' }}
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          {
            this.props.item.isActivate === true ? <div /> :
            <div>
              <div className={classes.licen}>
                <div><WrapperFormattedMessage id='userAndLicenseManagement.licenseCard.serialNumber' />：{this.props.item.license}</div>
                <button
                  style={{ height: '30px' }}
                  className={'pt-button pt-intent-primary'}
                  onClick={this.getLicense}
                  disabled={this.props.item.isActivate}
                >
                  <WrapperFormattedMessage id='userAndLicenseManagement.licenseCard.getSerialNumber' />
                </button>
              </div>
              <div style={{ margin: '0px 20px 20px 20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
                <span><WrapperFormattedMessage id='userAndLicenseManagement.licenseCard.getSerialNumber' />：</span>
                <Input
                  style={{
                    display: 'inline-block',
                    width: '60%',
                    marginTop: '16px',
                  }}
                  onChange={this.handleChangeOtherString}
                />
              </div>
            </div>
          }
          <div className={classes.mode}>
            <div><WrapperFormattedMessage id='userAndLicenseManagement.licenseCard.operationMode' />：</div>
            <div>
              <RadioGroup
                onChange={this.onChange}
                // disabled={this.props.item.isActivate}
                value={this.state.isTrainingOrJudging}
              >
                <Radio value={true}><WrapperFormattedMessage id='userAndLicenseManagement.licenseCard.training' /></Radio>
                <Radio value={false}><WrapperFormattedMessage id='userAndLicenseManagement.licenseCard.judging' /></Radio>
              </RadioGroup>
            </div>
          </div>
          <div className={classes.radio}>
            <button
              className={'pt-button pt-intent-primary'}
              onClick={this.activate}
              disabled={this.props.item.isActivate}
            >
              <WrapperFormattedMessage id='userAndLicenseManagement.licenseCard.activate' />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  ({ auth, intl: { locale } }) => ({
    locale,
    token: auth.token,
    // modelSettingList: state.licenseManagement,
  }),
)(injectIntl(LicenseCard))
