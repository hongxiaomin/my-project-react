import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import './style.less';

const SubMenu = Menu.SubMenu;
const Sider = props => (
  <div className={'sider'}>
    <Menu
      onClick={props.handleClick}
      openKeys={props.openKeys}
      selectedKeys={[props.selectedKeys]}
      onOpenChange={props.onOpenChange}
      mode="inline"
    >
      <SubMenu key="BOM" title={<span><Icon type="bulb" /><span>电子BOM管理</span></span>}>
        <SubMenu key="BomManage" title="BOM管理">
          <Menu.Item key="BomSearch"><Link to="/BomSearch">BOM查询</Link></Menu.Item>
          <Menu.Item key="BomProduct"><Link to="/BomProduct">BOM制作</Link></Menu.Item>
          <Menu.Item key="BomAudit"><Link to="/BomAudit">BOM审核</Link></Menu.Item>
          <Menu.Item key="BomMaintain"><Link to="/BomMaintain">BOM维护</Link></Menu.Item>
          <Menu.Item key="BomRecordSearch"><Link to="/BomRecordSearch">对料记录查询</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="RateMaintain"><Link to="/RateMaintain">rate维护</Link></Menu.Item>
      </SubMenu>
    </Menu>
  </div>
);
Sider.defaultProps = {

};
Sider.propTypes = {

};

export default Sider;
