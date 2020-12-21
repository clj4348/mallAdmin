import React from 'react'
import {
  Form,
  Input,
  Button,
} from 'antd';
import { postLogin } from 'service/user.jsx';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import utils from 'util/mm.jsx';

const FormItem = Form.Item;
/**
 * 普通的class组件
 */ 
class ClassCom extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      username: '', // 用户名
      password: '', // 密码
      usernameFlag: false, // 是否为空判断
      passwordFlag: false, //  密码是否为空判断
      redirectRouts: utils.getUrlParam('redirect') || '/' // 指定路由跳转
    }
  }
  // 用户名和密码
  onInputChange(e){
    console.log(e.target.value, 'sdfweer')
    let inputValue= e.target.value,
      inputName=  e.target.name;
    this.setState({
      [inputName]: inputValue
    })
  }
  onFocusChange(e){
    this.setState({
      usernameFlag: false,
      passwordFlag: false
    })
  }
  // 用户名
  isUsername () {
    if(this.state.username === '' ){
      this.setState({
        usernameFlag: true
      })
      return false
    }
    return true
  }
    // 输入密码
  isPassword () {
    if(this.state.password == '' ){
      this.setState({
        passwordFlag: true
      })
      return false
    }
    return true
  }
  toPostLogin(e){
    if(!this.isUsername()) return
    if(!this.isPassword()) return
    postLogin({
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      utils.setItem('userInfo', res.data);
      if(res.status === 0){
        this.props.history.push(this.state.redirectRouts);
      }
    })
  }
  render(){
    return (
      <div className="login-form-container">
        <p className="login-tit">登录</p>
        <FormItem>
          <Input
            size="large"
            onInput={ (e) => this.onInputChange(e)}
            onFocus = {(e) => this.onFocusChange(e)}
            name="username"
            placeholder="Username" prefix={<UserOutlined />} />
            {
              (() => {
                 if(this.state.usernameFlag){
                  return <p className="username-password-flag" style={{'color':'#ff6600'}}>用户不能为空</p>
                }
              })()
            }
        </FormItem>
        <FormItem>
          <Input
            size="large" 
            onInput={ (e) => this.onInputChange(e) } 
            onFocus = {(e) => this.onFocusChange(e)}
            prefix={ <UnlockOutlined />}
            type="password"
            name="password"
            placeholder="Password" />
            {
              (() => {
                 if(this.state.passwordFlag){
                  return <p className="username-password-flag" style={{'color':'#ff6600'}}>密码不能为空</p>
                }
              })()
            }
        </FormItem>
        <FormItem className="login-btn">
          <Button
            size="large"
            type="primary"
            onClick={(e) => this.toPostLogin(e)}
            className="login-form-button login-form-button-mall">登录</Button>
        </FormItem>
      </div>
    )
  }
}

export default ClassCom;