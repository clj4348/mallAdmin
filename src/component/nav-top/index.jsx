import React from 'react';
import './index.scss';
import {
  Layout,
  Menu,
  Avatar,
  Dropdown
} from 'antd';
const { Header } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="0">退出登录</Menu.Item>
  </Menu>
);
class NavTop extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Header className="nav-top-header">
        <div className="logo" />
        <Dropdown className="drop-avatar" overlay={menu} trigger={['click']}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Dropdown>
      </Header>
    )
  }
}

export default NavTop;