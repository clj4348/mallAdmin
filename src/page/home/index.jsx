import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { getHomeCount } from 'service/home.jsx';
import { Link } from 'react-router-dom';
import './index.scss'
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      orderCount: 0,
      productCount: 0,
      userCount: 0
    }
  }
  componentDidMount(){
    this.loadingCount()
  }
  loadingCount(){
    getHomeCount().then(res => {
      this.setState({
        orderCount: res.data.orderCount,
        productCount: res.data.productCount,
        userCount: res.data.userCount
      })
    })
  }
  render(){
    return (
      <div  className="home-card-title" style={{padding: '30px' }}>
        <Row gutter={16}>
          <Link to="/user">
            <Col span={8}>
              <Card title="用户总数" style={{background: '#f0ad4e', color:'#fff'}}>{this.state.userCount}</Card>
            </Col>
          </Link>
          <Link to="/product">
            <Col span={8}>
              <Card title="商品总数" style={{background: '#5cb85c', color:'#fff'}}>{this.state.productCount}</Card>
            </Col>
          </Link>
          <Link to="/order">
            <Col span={8}>
              <Card title="订单总数" style={{background: '#4cb1cf', color:'#fff'}}>{this.state.orderCount}</Card>
            </Col>
          </Link>
        </Row>
      </div>
    )
  }
}

export default Home;