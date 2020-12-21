import React, { Component } from 'react'
import {
  Form,
  Input,
  Table
} from 'antd';
import {
  getProductDetail
} from 'service/goods.jsx';
import {
  getCategory
} from 'service/category.jsx';
const FormItem = Form.Item;
const inputStyle = {
  width: '240px',
  height:'40px',
  border: '1px solid #e5e5e5',
  lineHeight:'40px',
  padding:'0 10px'
}
const imgStyle = {
  width:'78px',
  height: '78px',
  float: 'left',
  marginLeft: '20px',
  border:'1px solid #e5e5e5'
}
class ProductDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      productDetail:{}
    }
  }
  componentDidMount(){
    getProductDetail({
      productId:this.props.match.params.id
    }).then((res) => {
      console.log(res.data);
      this.setState({
        productDetail: res.data,
        pageSize: 10, // 默认10条数据
      })
    })
  }
  render(){
    return (
      <div>
        <p style={{fontSize:'24px'}}>商品详情</p>
        <FormItem
          label="商品名称："
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{this.state.productDetail.name}</p>
        </FormItem>
        <FormItem
          label="商品描述："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{this.state.productDetail.subtitle}</p>
        </FormItem>
        <FormItem
          label="当前状态："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{this.state.productDetail.status === 1 ? '在售' : '已下架'}</p>
        </FormItem>
        <FormItem
          label="所属分类："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{this.state.productDetail.statusDesc}</p>
        </FormItem>
        <FormItem
          label="商品价格："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{'￥' + this.state.productDetail.price}</p>
        </FormItem>
        <FormItem
          label="商品库存："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <p style={inputStyle}>{this.state.productDetail.stock}</p>
        </FormItem>
        <FormItem
          label="商品图片："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <div className="clearfix">
          { this.state.productDetail.subImages ? 
              this.state.productDetail.subImages.split(',').map((item,index) => 
                (
                  <img src={this.state.productDetail.imageHost + item} 
                    alt=""
                    style={{width:'78px', height: '78px', float: 'left', marginLeft: '20px',border:'1px solid #e5e5e5'}}
                    key={index}/>
                )
              )
            : ''
          }
        </div>
        </FormItem>
        <FormItem
          label="商品详情："
          labelCol={{ span: 2}}
          wrapperCol={{ span: 12 }}
        >
        <div dangerouslySetInnerHTML={{__html: this.state.productDetail.detail}}/>
        </FormItem>
      </div>
    )
  }
}

export default ProductDetail;