import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route ,Switch, Redirect} from 'react-router-dom';

import NavTop from 'component/nav-top/index.jsx';
import NavSide from 'component/nav-side/index.jsx';
// import 'font-awesome/css/font-awesome.min.css';
import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import Home from '@/home/index.jsx';
import Login from '@/login/index.jsx';
import User from '@/user/user.jsx';
import ProductManage from '@/product/manage/manage.jsx'
import ProductDetail from '@/product/manage/detail.jsx'
import Order from '@/order/order.jsx'
import OrderDetail from '@/order/detail.jsx'
import Error from '@/error/error.jsx';

const { Header, Footer, Sider, Content } = Layout;
let routeHtml = (
    <div>
      <Layout >
        <NavSide />
        <Layout >
          <NavTop />
          <Content style={{ margin: '86px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/user" exact component={User} />
              <Route path="/product/manage" exact component={ProductManage} />
              <Route path="/product/detail/:id" exact component={ProductDetail} />
              <Route path="/order" exact component={Order} />
              <Route path="/order/detail/:id" exact component={OrderDetail} />
              <Redirect exact from="/user" to="/user/index"/>
              <Route exact component={Error}></Route>
            </Switch>
            </div>
            </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
    );
ReactDom.render(
  <div>
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route render = { (props) => routeHtml } />
      </Switch>
    </HashRouter>
  </div>,
  document.getElementById('app')
)