import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Tag,
  Input,
  message
  } from 'antd';
import {
  getOrderList,
  getOrderSearch
} from 'service/order.jsx';
import moment from 'moment'
const { Column, ColumnGroup } = Table;
const Search = Input.Search;
class ProductManage extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      total: 0, // 总数
      orderList: [], // 产品列表
      pageSize: 10, // 默认10条数据
      pageNum: 1, // 默认为一页
      searchOrderNo: '' // 订单号查询
    }
    this.pageChange = this.pageChange.bind(this);
  }
  componentDidMount(){
    this.lodingOrderList({
      pageSize:  this.state.pageSize,
      pageNum: this.state.pageNum
    });
  }
  lodingOrderList(params){
    getOrderList({
      pageNum: params.pageNum,
      pageSize:params.pageSize
    }).then((res) =>{
      console.log(res.data.list)
      this.setState({
        orderList:res.data.list || 0,
        total:res.data.total
      })
    })
  }
  pageChange(selectedRowKeys, selectedRows){
    this.setState({
      pageNum: selectedRowKeys
    }, () => {
       this.lodingOrderList({
        pageSize:  this.state.pageSize,
        pageNum: this.state.pageNum
      });
    })
  }
  onSearch(val){
    if(!(/^[0-9]*$/ .test(val))) {
      message.error('订单号只可以输入数字');
      return 
    }
    if(val){
      this.setState({
        searchOrderNo: val
      }, () => {
        getOrderSearch({
          orderNo: this.state.searchOrderNo
        }).then(res => {
          if(res.status == 1){
            message.error(res.msg);
            return 
          }
          this.setState({
            orderList:res.data.list,
            total:res.data.total
          })
        })
      })
    }else {
      this.lodingOrderList({
        pageSize:  this.state.pageSize,
        pageNum: this.state.pageNum
      });
    }
  }
  groundingOrUndercarriage(params) {
    console.log(params);
    getGroundingOrUndercarriage({
      productId: params.id,
      status: params.status
    }).then( res => {
       message.success(res.data, 1);
    })
  }
  toOrderDetail(orderNo){
  }
  render(){
    return (
      <div>
        <div style={{'width':'300px',marginBottom: '30px'}}>
          <Search
            placeholder="请输入订单号"
            enterButton="搜索"
            size="large"
            onSearch={value => this.onSearch(value)}
          />
        </div>
        <Table
          pagination={{
            total: this.state.total,
            pageSize: this.state.pageSize,  //显示几条一页
            defaultPageSize: 1,
            onChange: this.pageChange
          }}
          rowKey={item => item.orderNo}
          dataSource={this.state.orderList}>
            <Column
              title="订单号"
              dataIndex="orderNo"
              key="orderNo"/>
            <Column
              title="收件人"
              dataIndex="receiverName"
              key="receiverName" />
            <Column  
              title="订单总价"
              render={(item) => '￥'+item.payment}
              key="payment"/>
          <Column
            title="订单状态"
            render = {(item) =>item.statusDesc}/>
          <Column  
            title="创建时间"
            dataIndex="createTime"/>
          <Column
            title="操作"
            render = {(item) =>(<Tag  color={'#2db7f5'} >
              <Link  to={'/order/detail/' + item.orderNo}>查看</Link></Tag>)}
            />
        </Table>
      </div>
    )
  }
}

export default ProductManage;