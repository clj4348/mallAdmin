import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { getHomeCount } from 'service/home.jsx';
import { Link } from 'react-router-dom';
import './error.scss'
class Error extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <div>
          <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
          <Link to="/">返回网站首页</Link>
        </div>
      </div>
    )
  }
}

export default Error;