import './login.scss'
import React from 'react'
import ClassCom from "./component/classCom.jsx";
import LoginHooks from "./component/loginHooks.jsx"
// 作为中转组件处理
function Login(props) {
  return <LoginHooks props={props}/>
}

export default Login;