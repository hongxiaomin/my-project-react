import React from 'react'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import ReactTable from 'components/ADCTable'
import { getRole, getStorage } from 'Utils'
import Confirm from 'components/Confirm'
import LicenseCard from '../LicenseCard'
import Edit from '../Edit'
import classes from './License.scss'
import { getLicenseList, reload, getUserList, deleteUser } from '../../modules'

const { CreateUser, EditUser } = Edit
const Roles = getRole()

export class License extends React.Component {
  constructor() {
    super()
    this.state = {
      highlightedIndex: -1,
      totalPages: null,
      loading: true,
      isDialogOpen: false,

      editOpen: false,
      editDefautlValue: {},

      deleteOpen: false,
      deleteId: null,

      height: 'auto',
    }
  }

  componentDidMount() {
    this.props.dispatch(getLicenseList())
    this.props.dispatch(getUserList())
  }

  del = () => {
    this.setState({
      deleteOpen: false,
    })
    this.props.dispatch(deleteUser(this.state.deleteId))
  }

  edit = original => () => {
    this.setState({
      editOpen: true,
      editDefautlValue: original,
    })
  }

  toggleDialog = () => {
    this.setState({
      editOpen: !this.state.editOpen,
    })
  }
  reload = () => {
    this.props.dispatch(reload())
  }

  showDelConform = id => () => {
    this.setState({
      deleteOpen: !this.state.deleteOpen,
      deleteId: id,
    })
  }

  handleCancel = () => {
    this.setState({
      deleteOpen: false,
    })
  }

  handlePageSize = (pageSize) => {
    if (pageSize > 10) {
      this.setState({
        height: '500px',
      })
    }
  }

  render() {
    const { intl } = this.props

    return (
      <div style={{ margin: '30px 40px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '50%' }}>
          <div className={classes.top}>
            <h4 className={classes.model}><WrapperFormattedMessage id='userAndLicenseManagement.license.userManagement' /></h4>
            <CreateUser type="create" />
          </div>
          <div>
            <div className={classes['top-left']}>
              <span className={classes.productGlass}>
                <WrapperFormattedMessage id='userAndLicenseManagement.license.userList' />
              </span>
            </div>
            <ReactTable
              data={this.props.userList}
              defaultPageSize={10}
              onPageSizeChange={this.handlePageSize}
              className="-striped -highlight"
              style={{
                maxHeight: '500px',
                height: this.state.height,
              }}
              columns={[
                {
                  Header: intl.formatMessage({ id: 'userAndLicenseManagement.license.userID' }),
                  accessor: 'userId',
                  style: {
                    textAlign: 'center',
                  },
                },
                {
                  Header: intl.formatMessage({ id: 'userAndLicenseManagement.license.userName' }),
                  accessor: 'userName',
                  style: {
                    textAlign: 'center',
                  },
                },
                {
                  Header: intl.formatMessage({ id: 'role' }),
                  accessor: 'roleIds',
                  style: {
                    textAlign: 'center',
                  },
                  Cell: data => Roles[data.original.roleIds[0]],
                },
                {
                  Header: intl.formatMessage({ id: 'action' }),
                  width: 80,
                  accessor: '',
                  style: {
                    textAlign: 'center',
                    padding: '5px',
                  },
                  Cell: (data) => {
                    let delNode = (
                      <button
                        type='button'
                        style={{ cursor: 'pointer' }}
                        className={'pt-button pt-minimal pt-icon-delete'}
                        onClick={this.showDelConform(data.original.userId)}
                        title={intl.formatMessage({ id: 'delete' })}
                      />)
                    if (this.props.userInfo.userId === data.original.userId) {
                      delNode = (<span style={{
                        marginLeft: '10px',
                        display: 'inline-block',
                        width: 16,
                      }}
                      />)
                    }
                    return (<div>
                      <button
                        type='button'
                        style={{ cursor: 'pointer' }}
                        className={'pt-button pt-minimal pt-icon-edit'}
                        onClick={this.edit(data.original)}
                        title={intl.formatMessage({ id: 'edit' })}
                      />
                      {delNode}
                    </div>)
                  },
                },
              ]}
              getTrProps={() => ({
                style: {
                  height: '35px',
                  lineHeight: '20px',
                },
              })}
            />
          </div>
        </div>
        <div style={{ width: '45%' }}>
          <div className={classes.top}>
            <h4 className={classes.model}><WrapperFormattedMessage id='userAndLicenseManagement.license.licenseManagement' /></h4>
            <button
              style={{ width: '80px' }}
              type='button'
              onClick={this.reload}
              className={'pt-button pt-intent-primary'}
            >
              <WrapperFormattedMessage id='reload' />
            </button>
          </div>
          <div className={classes.licenseCard}>
            {
              this.props.licenseList.map(item => <LicenseCard item={item} key={item.id} />)
            }
          </div>
        </div>
        <EditUser
          isOpen={this.state.editOpen}
          toggleDialog={this.toggleDialog}
          defaultValue={this.state.editDefautlValue}
        />
        <Confirm
          isOpen={this.state.deleteOpen}
          title={intl.formatMessage({ id: 'userAndLicenseManagement.license.note' })}
          handleOk={this.del}
          handleCancel={this.handleCancel}
        />
      </div>
    )
  }
}

License.propTypes = {
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  licenseList: PropTypes.array.isRequired,
  userList: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
}

export default connect((state) => {
  const str = getStorage('loginInfo')
  const userInfo = (str && JSON.parse(str)) || {}

  return {
    locale: state.intl.locale,
    token: state.auth.token,
    licenseList: state.licenseManagement.licenseList,
    userList: state.licenseManagement.userList,
    userInfo,
  }
})(injectIntl(License))
