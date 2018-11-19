import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route ,Switch} from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import 'antd/dist/antd.css'
import  LayoutComponent from  './component/layout/index.jsx';
import { Layout } from 'antd';
import Home from './page/home/index.jsx';
import GoodsManage from './page/goodsManage/index.jsx';
const { Header, Content, Footer } = Layout;
ReactDom.render(
  <div>
    <BrowserRouter>
    <div>
      <LayoutComponent />
      <Layout style={{ marginLeft: 200 }} >
          <Content style={{ margin: '86px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/goods_manage" exact component={GoodsManage}></Route>
                </Switch>
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
        </div>
      </BrowserRouter>
  </div>,
  document.getElementById('app')
)