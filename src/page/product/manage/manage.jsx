import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { getGoodsList } from 'service/goods.jsx';
import moment from 'moment'

const { Column, ColumnGroup } = Table;

class ProductManage extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      total: 0,
      goodsList: [],
      pageSize: 10,
      pageNum: 1,
    }
    this.pageChange = this.pageChange.bind(this);
  }
  componentDidMount(){
    this.loadingUserList({
      pageSize:  10,
      pageNum: this.state.pageNum
    });
  }
  pageChange(selectedRowKeys, selectedRows){
    this.setState({
      pageNum: selectedRowKeys
    }, () => {
       this.loadingUserList({
        pageSize:  this.state.pageSize,
        pageNum: this.state.pageNum
      });
    })
   
  }
  loadingUserList(params){
    getGoodsList(params).then(res => {
      this.setState({
        goodsList: res.data.list,
        total: res.data.total
      })
      console.log(res, '商品列表')
    })
  }
  render(){
    return (
      <Table
        pagination={{
          total: this.state.total,
          pageSize: this.state.pageSize,  //显示几条一页
          defaultPageSize: 1,
          onChange: this.pageChange,
        }}
        rowKey={item => item.id}
        dataSource={this.state.goodsList}>
          <Column
            title="ID"
            dataIndex="id"
            key="id"/>
          <Column
            title="信息"
            render = {(item) => (<div><p>{item.name}</p><p>{item.subtitle}</p></div>)}
            key="name" />
          <Column  
            title="价格"
            dataIndex="price"
            key="price"/>
        <Column
          title="状态"
          render = {(item) => (
            <div>
              <p>{item.status === 1 ? '在售' : '已下架'}</p>
              <Tag  color={'#2db7f5'}>{item.status === 1 ?  '下架' : '上架' }</Tag>
              </div>)}
          key="phone"/>
        <Column
          title="操作"
          render = {(item) => moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}
          key="createTime"/>
      </Table>
    )
  }
}

export default ProductManage;