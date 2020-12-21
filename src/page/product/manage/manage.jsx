import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  Table,
  Divider,
  Tag,
  message,
  Input,
  Radio  } from 'antd';
import {
  getGoodsList,
  getGroundingOrUndercarriage,
  getSearch
} from 'service/goods.jsx';
import moment from 'moment'

const { Column, ColumnGroup } = Table;
const RadioGroup = Radio.Group;
const Search = Input.Search;
class ProductManage extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      total: 0, // 总数
      goodsList: [], // 产品列表
      pageSize: 10, // 默认10条数据
      pageNum: 1, // 默认为一页
      productSearch: '', // 产品搜索
      value: 1
    }
    this.pageChange = this.pageChange.bind(this);
    this.groundingOrUndercarriage = this.groundingOrUndercarriage.bind(this);
    this.onSearch = this.onSearch.bind(this);
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
    if(this.state.productSearch){
      this.onSearch(
        this.state.productSearch
      )
    } else {
      getGoodsList(params).then(res => {
        this.setState({
          goodsList: res.data.list,
          total: res.data.total
        })
      })
    }
  }
  onChangeRadio(e){
    this.setState({
      value: e.target.value,
    });
  }
  onSearch(val){
    let searchData = {
      pageNum: this.state.pageNum,
      pageSize:this.state.pageSize
    }
    
    this.setState({
      productSearch: val
    }, () => {
      if(this.state.value === 1){
        Object.assign(searchData, {productId: this.state.productSearch}, searchData);
      } else { 
        Object.assign(searchData, {productName: this.state.productSearch}, searchData);
      }
      getSearch(searchData).then(res => {
        this.setState({
          goodsList: res.data.list,
          total: res.data.total
        })
      })
    })
  }
  groundingOrUndercarriage(params) {
    const status = params.status === 1 ? 2 : 1;
    getGroundingOrUndercarriage({
      productId: params.id,
      status: status
    }).then( res => {
      message.success(res.data, 1);
      this.loadingUserList({
        pageSize:  this.state.pageSize,
        pageNum: this.state.pageNum
      });
    })
  }
  render(){
    return (
      <div>
        <RadioGroup onChange={(e) => this.onChangeRadio(e)} value={this.state.value}>
          <Radio value={1}>根据商品Id查询</Radio>
          <Radio value={2}>根据商品名称查询</Radio>
        </RadioGroup>
        <div style={{'width':'300px',marginBottom: '30px', 'marginTop':'20px'}}>
          <Search
            placeholder="关键字"
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
                <Tag  color={'#2db7f5'}
                  onClick={() => this.groundingOrUndercarriage(item)}>
                  {item.status === 1 ?  '下架' : '上架' }
                </Tag>
              </div>)}
            key="phone"/>
          <Column
            title="操作"
            render = {(item) =>(
                <div>
                  <Tag  color={'#2db7f5'}>
                    <Link  to={'/product/detail/' + item.id}>查看</Link>
                  </Tag>
                  <Tag  color={'#2db7f5'}>编辑</Tag>
                </div>
              )}
            key="createTime"/>
        </Table>
      </div>
    )
  }
}

export default ProductManage;