import React, { useState }from 'react'
import {
  Form,
  Input,
  Button,
} from 'antd';
import { postLogin } from 'service/user.jsx';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import utils from 'util/mm.jsx';

const FormItem = Form.Item;
function LoginHooks (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFlag, setUsernameFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);

  const onInputChange = (e, type) => {
    if(type === 'unsername') {
      setUsername(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }
  const onFocusChange = () =>{
    setUsernameFlag(false)
    setPasswordFlag(false)
  }
  // 用户名
  const isUsername = () => {
    if(username == '' ){
      setUsernameFlag(true)
      return false
    }
    return true
  }
  // 输入密码
  const isPassword = () => {
    if(password === '' ){
      setPasswordFlag(true)
      return false
    }
    return true
  }
  function toPostLogin(e){
    if(!isUsername()) return
    if(!isPassword()) return
    postLogin({
      username: username,
      password: password
    }).then((res) => {
      utils.setItem('userInfo', res.data);
      // if(res.status === 0){
      //   this.props.history.push(this.state.redirectRouts);
      // }
    })
  }
  return (
    <div className="login-form-container">
      <p className="login-tit">登录</p>
      <FormItem>
        <Input
          size="large"
          onInput={ (e) => onInputChange(e, 'userName')}
          onFocus = { onFocusChange }
          name="username"
          placeholder="Username" prefix={<UserOutlined />} />
          {
            (() => {
              if(usernameFlag){
                return <p className="username-password-flag" style={{'color':'#ff6600'}}>用户不能为空</p>
              }
            })()
          }
      </FormItem>
      <FormItem>
        <Input
          size="large" 
          onInput={ (e) => onInputChange(e, 'password') } 
          onFocus = { onFocusChange }
          prefix={ <UnlockOutlined />}
          type="password"
          name="password"
          placeholder="Password" />
          {
            (() => {
                if(passwordFlag){
                return <p className="username-password-flag" style={{'color':'#ff6600'}}>密码不能为空</p>
              }
            })()
          }
      </FormItem>
      <FormItem className="login-btn">
        <Button
          size="large"
          type="primary"
          onClick={ () => toPostLogin()}
          className="login-form-button login-form-button-mall">登录</Button>
      </FormItem>
    </div>
  )
}


export default LoginHooks;