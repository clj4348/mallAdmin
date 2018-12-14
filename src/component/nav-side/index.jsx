import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './index.scss'
import {
  Layout,
  Menu,} from 'antd';
const { SubMenu } = Menu;  
const { Header, Content, Footer, Sider } = Layout;
class NavSide extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Sider className="nav-side">
        <Menu
          mode="inline"
          style={{ height: '100%' }}
        >
          <Menu.Item key="1" >
            <Link to={'/'}>首页</Link>
          </Menu.Item>
          <SubMenu key="sub2" title={<span>商品</span>}>
            <Menu.Item key="5">
              <Link to={'/product/manage'}>商品管理</Link>
            </Menu.Item>
            <Menu.Item key="6">品类管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span>订单</span>}>
            <Menu.Item key="9">订单管理</Menu.Item>
          </SubMenu>
           <SubMenu key="sub4" title={<span>用户</span>}>
            <Menu.Item key="10">用户管理</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

export default NavSide;