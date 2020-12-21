import React, { Component } from 'react'
import {
  Form,
  Input,
  Table
} from 'antd';
import {
  getOrderDetail
} from 'service/order.jsx';
const FormItem = Form.Item;
const { Column } = Table;
class OrderDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      orderDetail:{}
    }
  }
  componentDidMount(){
    getOrderDetail({
      orderNo:this.props.match.params.id
    }).then((res) => {
      console.log(res.data.orderItemVoList);
      this.setState({
        orderDetail: res.data,
        pageSize: 10, // 默认10条数据
      })
    })
  }
  render(){
    const inputStyle = {
      width: '240px',
      height:'40px',
      border: '1px solid #e5e5e5',
      lineHeight:'40px',
      padding:'0 10px'
    }
    return (
      <div>
        <p style={{fontSize:'24px'}}>订单详情</p>
        <FormItem
          label="订单号："
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{this.state.orderDetail.orderNo}</p>
        </FormItem>
        <FormItem
          label="创建时间："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{this.state.orderDetail.createTime}</p>
        </FormItem>
        <FormItem
          label="收件人："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{this.state.orderDetail.receiverName ? this.state.orderDetail.receiverName : ''}</p>
        </FormItem>
        <FormItem
          label="订单状态："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{this.state.orderDetail.statusDesc}</p>
        </FormItem>
        <FormItem
          label="支付方式："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{ this.state.orderDetail.paymentTypeDesc}</p>
        </FormItem>
        <FormItem
          label="订单金额："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{'￥' +this.state.orderDetail.payment}</p>
        </FormItem>

         <Table
          pagination={{
            total: this.state.total,
            pageSize: this.state.pageSize,  //显示几条一页
          }}
          rowKey={item => item.productId}
          dataSource={this.state.orderDetail.orderItemVoList}>
            <Column
              title="商品图片"
              render = {(item) => (
                <div>
                  <img style={{width: '140px'}} src={this.state.orderDetail.imageHost + item.productImage} />
                </div>)}
              key = {item => item.productId}
            />

            <Column
              title="商品信息"
              dataIndex="productName"/>
            <Column  
              title="单价"
              render={(item) => '￥'+item.currentUnitPrice}/>
          <Column
            title="数量"
            dataIndex="quantity"/>
          <Column  
            title="合计"
            render={(item) => '￥'+item.totalPrice} />
        </Table>
      </div>
    )
  }
}

export default OrderDetail;