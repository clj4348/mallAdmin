 import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { getUserList } from 'service/user.jsx';
import moment from 'moment'
console.log(moment(Date.now()).format('YYYY-MM-DD') );
const { Column, ColumnGroup } = Table;

import './user.less';
class User extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      total: 0,
      userList: [],
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
    console.log(selectedRowKeys)
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
    getUserList(params).then(res => {
      this.setState({
        userList: res.data.list,
        total: res.data.total
      })
      console.log(res, '用户数')
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
        dataSource={this.state.userList}>
          <Column
            title="ID"
            dataIndex="id"
            key="id"/>
          <Column
            title="用户名"
            dataIndex="username"
            key="username" />
          <Column  
            title="邮箱"
            dataIndex="email"
            key="email"/>
        <Column
          title="电话"
          dataIndex="phone"
          key="phone"/>
        <Column
          title="注册时间"
          render = {(item) => moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}
          key="createTime"/>
    </Table>
    )
  }
}

export default User;