import React, { Component } from 'react'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox } from 'antd';
import { postLogin } from 'service/user.jsx';
import utils from 'util/mm.jsx';
import './login.scss'
const FormItem = Form.Item;

class Login extends Component {
  constructor(props){
    super(props)
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
    let inputValue= e.target.value,
         inpurtName = e.target.name;
    this.setState({
      [inpurtName]: inputValue
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
       console.log('asdfsf')
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
      <div className="login-form">
        <p className="login-tit">登录</p>
        <FormItem>
          <Input onInput={ (e) => this.onInputChange(e)}
            onFocus = {(e) => this.onFocusChange(e)}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            name="username" />
            {
              (() => {
                 if(this.state.usernameFlag){
                  return <p className="username-password-flag" style={{'color':'#ff6600'}}>用户不能为空</p>
                }
              })()
            }
        </FormItem>
        <FormItem>
          <Input onInput={ (e) => this.onInputChange(e) } 
            onFocus = {(e) => this.onFocusChange(e)}
            prefix={<Icon type="lock"
            style={{ color: 'rgba(0,0,0,.25)' }} />}
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
          <Button type="primary"
            onClick={(e) => this.toPostLogin(e)}
            className="login-form-button login-form-button-mall">登录</Button>
        </FormItem>
      </div>
    )
  }
}

export default Login;