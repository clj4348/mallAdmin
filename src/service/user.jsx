import http from 'util/http.jsx';


// 登录接口
const postLogin = (options) =>  http.post('/api/manage/user/login.do',options);
// 所有的用户
const getUserList = (options) => http.get('/api/manage/user/list.do', options);
export {
  postLogin,
  getUserList
} 