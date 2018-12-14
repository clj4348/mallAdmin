import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route ,Switch, Redirect} from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import 'antd/dist/antd.css'
import  LayoutComponent from  'component/layout/index.jsx';
import { Layout } from 'antd';
import Home from '@/home/index.jsx';
import Login from '@/login/index.jsx';
import User from '@/user/user.jsx';
import ProductManage from '@/product/manage/manage.jsx'
import Error from '@/error/error.jsx';
const { Header, Content, Footer } = Layout;
let routeHtml = (
    <div>
      <LayoutComponent />
        <Layout style={{ marginLeft: 200 }} >
            <Content style={{ margin: '86px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/user" exact component={User} />
                  <Route path="/product/manage" exact component={ProductManage} />
                  <Redirect exact from="/user" to="/user/index"/>
                  <Route exact component={Error}></Route>
                  </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
          </div>
      );
ReactDom.render(
  <div>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route render = { (props) => routeHtml } />
        </Switch>
          </div>
      </BrowserRouter>
  </div>,
  document.getElementById('app')
)