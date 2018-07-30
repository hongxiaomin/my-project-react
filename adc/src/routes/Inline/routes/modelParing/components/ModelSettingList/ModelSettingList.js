import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
// import { assign } from 'lodash'
// Import React Table
import { connect } from 'react-redux'
import { Icon } from 'antd'
import ReactTable from 'components/ADCTable'
import EditDialog from '../EditDialog'
import Delete from './DeleteDialog'
import TrialRun from './TrialRun'
import classes from './ModelSettingList.scss'
import { getModelSettingList, CHANGE_STATUS } from '../../modules/ModelParing'

export class ModelSettingList extends React.Component {
  constructor() {
    super()
    this.state = {
      highlightedIndex: -1,
      totalPages: null,
      loading: true,
      editOpen: false,
      delOpen: false,
      trialRunOpen: false,
      dataDetail: {},
    }
    this.trialRun = this.trialRun.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.del = this.del.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  componentDidMount() {
    const tmp = {
      queryType: 'list',
    }
    this.props.dispatch(getModelSettingList(tmp))
  }

  toggleEdit(data) {
    return () => {
      this.setState({
        ...this.state,
        dataDetail: data,
        editOpen: !this.state.editOpen,
      })
      this.props.dispatch({
        type: CHANGE_STATUS,
        payload: false,
      })
    }
  }
  trialRun(data) {
    return () => {
      this.setState({
        ...this.state,
        dataDetail: data,
        trialRunOpen: !this.state.trialRunOpen,
      })
    }
  }
  del(data) {
    return () => {
      this.setState({
        ...this.state,
        dataDetail: data,
        delOpen: !this.state.delOpen,
      })
    }
  }
// 导入功能实现
  fileUpload = () => this.file.click()

  props: Props

  render() {
    const { intl } = this.props

    return (
      <div style={{ margin: '30px 40px' }}>
        <div className={classes['top-left']}>
          <span className={classes.productGlass}>
            <WrapperFormattedMessage id='modelPairing.modelParing.list' />
          </span>
        </div>
        <ReactTable
          data={this.props.modelSettingList}
          defaultPageSize={10}
          className="-striped -highlight"
          columns={[
            {
              Header: intl.formatMessage({ id: 'processId' }),
              accessor: 'processName',
              width: 200,
              style: {
                textAlign: 'center',
                // verticalAlign: 'center',
              },
            },
            {
              Header: intl.formatMessage({ id: 'productId' }),
              accessor: 'productName',
              width: 200,
              style: {
                textAlign: 'center',
              },
            },
            {
              Header: intl.formatMessage({ id: 'serviceManagement.dialogFilter.model' }),
              accessor: 'modelName',
              width: 200,
              style: {
                textAlign: 'center',
              },
            },
            {
              Header: intl.formatMessage({ id: 'labelingTool.eda.defectCode' }),
              id: 'defectCode',
              accessor: d => d.defectType.join('/ '),
              style: {
                textAlign: 'center',
                whiteSpace: 'normal',
              },
            },
            {
              Header: intl.formatMessage({ id: 'serviceManagement.queueList.action' }),
              width: 200,
              accessor: '',
              style: {
                textAlign: 'center',
                padding: '5px',
              },
              Cell: data => (
                <div>
                  {
                    data.original.isTrialRun ?
                      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button
                          type='button'
                          onClick={this.toggleEdit(data)}
                          className={'pt-button pt-minimal pt-icon-edit'}
                          title={intl.formatMessage({ id: 'serviceManagement.serviceCard.edit' })}
                        />
                        <button
                          type='button'
                          onClick={this.trialRun(data)}
                          className={'pt-button pt-minimal'}
                          title={intl.formatMessage({ id: 'modelPairing.modelParing.cancelTrialRun' })}
                        >
                          <Icon type="star" style={{ color: 'orange' }} />
                        </button>
                        <button
                          type='button'
                          onClick={this.del(data)}
                          className={'pt-button pt-minimal pt-icon-delete'}
                          title={intl.formatMessage({ id: 'delete' })}
                        />
                      </div> :
                      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button
                          type='button'
                          onClick={this.toggleEdit(data)}
                          className={'pt-button pt-minimal pt-icon-edit'}
                          title={intl.formatMessage({ id: 'edit' })}
                        />
                        <button
                          type='button'
                          onClick={this.trialRun(data)}
                          className={'pt-button pt-minimal'}
                          title={intl.formatMessage({ id: 'modelPairing.modelParing.setAsTrialRun' })}
                        >
                          <Icon type="star" />
                        </button>
                        <button
                          type='button'
                          onClick={this.del(data)}
                          className={'pt-button pt-minimal pt-icon-delete'}
                          title={intl.formatMessage({ id: 'delete' })}
                        />
                      </div>
                   }
                </div>
              ),
            },
          ]}
          getTrProps={() => ({
            style: {
              height: '35px',
              lineHeight: '20px',
            },
          })}
        />
        {
          this.state.editOpen &&
          <EditDialog
            toggleEdit={this.toggleEdit()}
            modelList={this.props.modelList}
            dataDetail={this.state.dataDetail}
            editOpen={this.state.editOpen}
          />
        }
        <TrialRun
          trialRun={this.trialRun()}
          dataDetail={this.state.dataDetail}
          trialRunOpen={this.state.trialRunOpen}
          searchParam={this.props.searchParam}
        />
        <Delete
          toggleDel={this.del()}
          dataDetail={this.state.dataDetail}
          delOpen={this.state.delOpen}
        />
      </div>
    )
  }
}

ModelSettingList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modelSettingList: PropTypes.array.isRequired,
  modelList: PropTypes.array.isRequired,
  searchParam: PropTypes.object.isRequired,
}

export default connect(
  ({ auth, modelParing, intl: { locale } }) => ({
    locale,
    token: auth.token,
    modelSettingList: modelParing.modelSettingList,
  }),
)(injectIntl(ModelSettingList))
