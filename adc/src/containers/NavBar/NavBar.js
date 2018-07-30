import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Popover, Position } from '@blueprintjs/core'
import { getStorage } from 'Utils'
import { deauthenticate } from '../../actions'
import LanguageSelect from '../LanguageSelect'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import './NavBar.scss'

export const InlineMenu = () => (
  <ul className='pt-menu pt-elevation-1'>
    <li>
      <a className='pt-menu-item pt-icon-build' href='/inline/service'>
        <WrapperFormattedMessage
          id="nav.serviceManagement"
        />
      </a>
      <a className='pt-menu-item pt-icon-build' href='/inline/modelPairing'>
        <WrapperFormattedMessage
          id="nav.modelPairing"
        />
      </a>
      <a className='pt-menu-item pt-icon-build' href='/inline/confidenceThreshold'>
        <WrapperFormattedMessage
          id="nav.confidenceThreshold"
        />
      </a>
    </li>
  </ul>
)

export const OfflineMenu = () => (
  <ul className='pt-menu pt-elevation-1'>
    <li>
      <a className='pt-menu-item pt-icon-build' href='/offline/labeling'>Labeling Tool</a>
    </li>
  </ul>
)

export const LicenseMenu = ({ dispatch }) => (
  <ul className='pt-menu pt-elevation-1' style={{ minWidth: 'auto' }}>
    <li>
      <button className='pt-button pt-minimal pt-icon-log-out' onClick={() => dispatch(deauthenticate())}>Log Out</button>
    </li>
  </ul>
)
LicenseMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
export const ModelMenu = () => (
  <ul className='pt-menu pt-elevation-1'>
    <li>
      <a className='pt-menu-item pt-icon-build' href='/model/modelManagement'>Model Management</a>
    </li>
  </ul>
)

const serviceManagementisActive = isActive => (isActive('/inline/service') || isActive('/inline/modelPairing') || isActive('/inline/confidenceThreshold'))

const buttonClass = flag => (flag ? ' active' : '')

export const NavBar = ({ children, dispatch, userInfo, router }) => (
  <div className='container text-center'>
    <nav className='pt-navbar' styleName="navbar">
      <div style={{ margin: 'auto 5%', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '100%' }}>
          <div className='pt-navbar-group pt-align-left'>
            <div className='pt-navbar-heading' styleName="h1">ADC</div>
          </div>
          <div className='pt-navbar-group pt-align-left' style={{ marginLeft: '2%' }}>
            {
              userInfo.roleIds && userInfo.roleIds[0] === 'admin' ? (
                <Popover styleName="item" content={<InlineMenu />} position={Position.BOTTOM}>
                  <button
                    className='pt-button pt-minimal'
                    style={{ borderRadius: '0px' }}
                    styleName={`button${buttonClass(serviceManagementisActive(router.isActive))}`}
                  >
                    <WrapperFormattedMessage
                      id="nav.serviceManagement"
                    />
                  </button>
                </Popover>) : ''
              }
            {
              userInfo.roleIds && userInfo.roleIds[0] === 'admin' ? (
                <a
                  className='pt-button pt-minimal'
                  style={{ borderRadius: '0px' }}
                  styleName={`button${buttonClass(router.isActive('/model/modelManagement'))}`}
                  href='/model/modelManagement'
                >
                  <WrapperFormattedMessage
                    id="nav.modelManagement"
                  />
                </a>) : ''
            }
            <a
              className='pt-button pt-minimal'
              style={{ borderRadius: '0px' }}
              styleName={`button${buttonClass(router.isActive('/offline/labeling'))}`}
              href='/offline/labeling'
            >
              <WrapperFormattedMessage
                id="nav.labelingTool"
              />
            </a>
            {
              userInfo.roleIds && userInfo.roleIds[0] === 'admin' ? (
                <a
                  className='pt-button pt-minimal'
                  style={{ borderRadius: '0px' }}
                  styleName={`button${buttonClass(router.isActive('/license/licenseManagement'))}`}
                  href='/license/licenseManagement'
                >
                  <WrapperFormattedMessage
                    id="nav.userAndLicenseManagement"
                  />
                </a>) : ''
            }
          </div>
        </div>
        <div className='pt-navbar-group pt-align-left'>
          <Popover
            content={<LicenseMenu
              dispatch={dispatch}
            />}
            styleName="item"
            position={Position.BOTTOM}
          >
            <button
              className='pt-button pt-minimal'
              style={{ borderRadius: '0px' }}
              styleName={'button'}
            >{userInfo.userName}</button>
          </Popover>
          <LanguageSelect />
        </div>
      </div>
    </nav>
    <div>{ children }</div>
  </div>
)

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
}

export default connect(() => {
  let userInfo = getStorage('loginInfo')
  userInfo = userInfo && JSON.parse(userInfo) || {}
  return {
    userInfo,
  }
})(NavBar)
