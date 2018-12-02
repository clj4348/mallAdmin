import http from 'util/http.jsx';


// 登录接口
const postLogin = (options) =>  http.post('/api/manage/user/login.do',options);

export {
  postLogin
} 