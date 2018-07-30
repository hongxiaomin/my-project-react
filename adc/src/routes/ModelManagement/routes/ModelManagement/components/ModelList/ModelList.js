import React from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import ReactTable from 'components/ADCTable'
import { Icon } from 'antd'
import { injectIntl } from 'react-intl'
import { modelListStatus } from 'Utils'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import Delete from './DeleteDialog'
import Publish from './PublishDialog'
import UnPublish from './UnPublishDialog'
import DefaultD from './DefaultDialog'
import UnDefault from './UnDefaultDialog'
import ImportModel from '../AddImportModel'
// import EditModel from '../EditModel'
import EditModelName from '../EditModelName'
import ActionModel from '../ActionModel'
import classes from './ModelList.scss'
import { getModelList, PAGE_STATUS, getModelDetail, COPY_MODEL_DETAIL } from '../../modules'

type Props = {
  dispatch: Function,
  modelList: Array,
  isDetail: Function,
  intl: Object,
}

const activeRowStyle = {
  background: 'skyblue',
  color: '#fff',
  height: '35px',
  lineHeight: '20px',
}

export class ModelList extends React.Component {
  constructor() {
    super()
    this.state = {
      highlightedIndex: -1,
      isOpen: false,
      editOpen: false,
      editNameOpen: false,
      copyOpen: false,
      delOpen: false,
      publishOpen: false,
      unPublishOpen: false,
      importOpen: false,
      isDefaultOpen: false,
      unDefaultOpen: false,
      dataDetail: {},
    }
    this.handleClick = this.handleClick.bind(this)
    this.del = this.del.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleCopy = this.toggleCopy.bind(this)
    this.toggleEditName = this.toggleEditName.bind(this)
    this.togglePublish = this.togglePublish.bind(this)
    this.toggleImport = this.toggleImport.bind(this)
    this.toggleUnPublish = this.toggleUnPublish.bind(this)
    this.toggleunDefault = this.toggleunDefault.bind(this)
    this.toggleDefault = this.toggleDefault.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getModelList())
  }

  handleClick(data) {
    this.setState({
      isOpen: true,
    })
    this.props.isDetail(true, data)
    this.props.dispatch(getModelDetail(data._original.id)) // 传入modelid
    this.props.dispatch({
      type: PAGE_STATUS,
      payload: 'detailPage',
    })
  }
  toggleImport() {
    this.setState({
      importOpen: !this.state.importOpen,
    })
  }
  toggleDefault(data) {
    return () => {
      this.setState({
        ...this.state,
        dataDetail: data,
        isDefaultOpen: !this.state.isDefaultOpen,
      })
    }
  }
  toggleunDefault(data) {
    return () => {
      this.setState({
        ...this.state,
        dataDetail: data,
        unDefaultOpen: !this.state.unDefaultOpen,
      })
    }
  }
  toggleEdit(data) {
    return () => {
      let tmp
      if (data && data.original) {
        tmp = {
          ...data.original,
        }
      }
      this.setState({
        ...this.state,
        dataDetail: tmp,
        editOpen: !this.state.editOpen,
      }, () => {
        this.props.dispatch({
          type: COPY_MODEL_DETAIL,
          data: this.state.dataDetail,
        })
      })
    }
  }
  toggleCopy(data) {
    return () => {
      let tmp
      if (data && data.original) {
        tmp = {
          ...data.original,
        }
      }
      this.setState({
        ...this.state,
        dataDetail: tmp,
        copyOpen: !this.state.copyOpen,
      }, () => {
        this.props.dispatch({
          type: COPY_MODEL_DETAIL,
          data: this.state.dataDetail,
        })
      })
    }
  }
  toggleEditName(data) {
    return () => {
      this.setState({
        ...this.state,
        dataDetail: data,
        editNameOpen: !this.state.editNameOpen,
      })
    }
  }
  togglePublish(data) {
    return () => {
      this.setState({
        ...this.state,
        dataDetail: data,
        publishOpen: !this.state.publishOpen,
      })
    }
  }
  toggleUnPublish(data) {
    return () => {
      this.setState({
        ...this.state,
        dataDetail: data,
        unPublishOpen: !this.state.unPublishOpen,
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

  actionCell = intl => data => (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {
        data.original.status !== 'Idle' ?
          <button
            type='button'
            onClick={this.toggleEditName(data)}
            className={'pt-button pt-minimal pt-icon-edit'}
            title={intl.formatMessage({ id: 'edit' })}
          /> :
          <button
            type='button'
            onClick={this.toggleEdit(data)}
            className={'pt-button pt-minimal pt-icon-edit'}
            title={intl.formatMessage({ id: 'edit' })}
          />
      }
      <button
        type='button'
        onClick={this.toggleCopy(data)}
        className={'pt-button pt-minimal pt-icon-duplicate'}
        title={intl.formatMessage({ id: 'copy' })}
      />
      <button
        type='button'
        onClick={this.del(data)}
        disabled={data.original.status === 'activated'}
        className={'pt-button pt-minimal pt-icon-delete'}
        title={intl.formatMessage({ id: 'delete' })}
      />
      {
        data.original.isPublished ?
          <button
            type='button'
            onClick={this.toggleUnPublish(data)}
            disabled={data.original.status !== 'Tested'}
            className={'pt-button pt-minimal pt-icon-cloud-download'}
            title={intl.formatMessage({ id: 'inactivate' })}
          /> :
          <button
            type='button'
            onClick={this.togglePublish(data)}
            disabled={data.original.status !== 'Tested'}
            className={'pt-button pt-minimal pt-icon-cloud-upload'}
            title={intl.formatMessage({ id: 'activate' })}
          />
      }
      {
        data.original.isDefault ?
          <button
            type='button'
            onClick={this.toggleunDefault(data)}
            disabled={data.original.isPublished !== true}
            className={'pt-button pt-minimal'}
            title={intl.formatMessage({ id: 'modelManagement.modelList.cancelDefaultModel' })}
          >
            <Icon type="star" style={{ color: 'orange' }} />
          </button> :
          <button
            type='button'
            onClick={this.toggleDefault(data)}
            disabled={data.original.isPublished !== true}
            className={'pt-button pt-minimal'}
            title={intl.formatMessage({ id: 'modelManagement.modelList.setDefaultModel' })}
          >
            <Icon type="star" />
          </button>
      }
    </div>
  )

  props: Props

  render() {
    const { intl } = this.props
    const style = { textAlign: 'center' }
    const columns = [
      {
        Header: `${intl.formatMessage({ id: 'modelId' })}`,
        accessor: 'id',
        style,
      },
      {
        Header: `${intl.formatMessage({ id: 'modelName' })}`,
        accessor: 'name',
        style,
      },
      {
        Header: `${intl.formatMessage({ id: 'status' })}`,
        accessor: 'status',
        style,
      },
      {
        Header: `${intl.formatMessage({ id: 'service' })}`,
        id: 'currentState',
        accessor: d => ((d.currentState === 'none' && d.isTrained === true && d.isVerified === false) ||
        (d.currentState === 'none' && d.isTrained === false && d.isVerified === false) ||
        (d.currentState === 'none' && d.isTrained === true && d.isVerified === true) ? 'Not in use' : 'In use'),
        style,
      },
      {
        Header: `${intl.formatMessage({ id: 'modelManagement.modelList.numberOfIteration' })}`,
        accessor: 'iteration',
        style,
      },
      {
        Header: `${intl.formatMessage({ id: 'lossRate' })}`,
        accessor: 'lossRate',
        style,
      },
      {
        Header: `${intl.formatMessage({ id: 'modelVersion' })}`,
        accessor: 'version',
        style,
      },
      {
        Header: `${intl.formatMessage({ id: 'modelManagement.ModelDetail.createTime' })}`,
        accessor: 'createTime',
        style,
      },
      {
        Header: `${intl.formatMessage({ id: 'action' })}`,
        accessor: '',
        style,
        Cell: this.actionCell(intl),
      },
    ]

    return (
      <div>
        <div className={classes['top-left']}>
          <span className={classes.productGlass}>
            <WrapperFormattedMessage id="modelManagement.modelList" />
          </span>
          <ImportModel />
        </div>
        <ReactTable
          data={modelListStatus(this.props.modelList)}
          defaultPageSize={5}
          className="-striped -highlight"
          style={{ height: '255px' }}
          columns={columns}
          getTrProps={(...params) => {
            const rowInfo = params[1]
            if (rowInfo) {
              return {
                style: (this.state.selectedIndex === rowInfo.index) ? activeRowStyle : { height: '35px', lineHeight: '20px' },
                onClick: () => {
                  this.setState({
                    selectedIndex: rowInfo.index,
                  })
                  this.handleClick(rowInfo.row)
                },
              }
            }
            return {}
          }}
        />
        <Delete
          toggleDel={this.del()}
          dataDetail={this.state.dataDetail}
          delOpen={this.state.delOpen}
        />
        <DefaultD
          toggleDefault={this.toggleDefault()}
          dataDetail={this.state.dataDetail}
          isDefaultOpen={this.state.isDefaultOpen}
        />
        <UnDefault
          toggleunDefault={this.toggleunDefault()}
          dataDetail={this.state.dataDetail}
          unDefaultOpen={this.state.unDefaultOpen}
        />
        <Publish
          togglePublish={this.togglePublish()}
          dataDetail={this.state.dataDetail}
          publishOpen={this.state.publishOpen}
        />
        <UnPublish
          toggleUnPublish={this.toggleUnPublish()}
          dataDetail={this.state.dataDetail}
          unPublishOpen={this.state.unPublishOpen}
        />
        {
          !isEmpty(this.state.dataDetail) &&
          <ActionModel
            title={intl.formatMessage({ id: 'modelManagement.actionModel.editModel' })}
            toggle={this.toggleEdit()}
            visible={this.state.editOpen}
          />
        }
        {
          !isEmpty(this.state.dataDetail) &&
          <ActionModel
            title={intl.formatMessage({ id: 'modelManagement.actionModel.copyModel' })}
            toggle={this.toggleCopy()}
            visible={this.state.copyOpen}
          />
        }
        {
          !isEmpty(this.state.dataDetail) &&
          this.state.editNameOpen &&
          <EditModelName
            toggleEdit={this.toggleEditName()}
            dataDetail={this.state.dataDetail}
            editOpen={this.state.editNameOpen}
          />
        }
      </div>
    )
  }
}

export default injectIntl(connect(
  state => ({
    token: state.auth.token,
    modelList: state.modelManagement.modelList,
  }),
)(ModelList))
