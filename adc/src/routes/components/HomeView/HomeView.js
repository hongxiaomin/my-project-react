import React from 'react'
import LoginForm from 'containers/LoginForm'
import './HomeView.scss'

const HomeView = () => (
  <div styleName='LoginForm'>
    <LoginForm />
    <span styleName='footerText'>© 2017 台达智能科技(北京)有限公司 版权所有.</span>
    <span styleName='footerText'>版本：{__VERSION__}</span>
  </div>
)

export default HomeView
