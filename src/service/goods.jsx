import http from 'util/http.jsx';


// 登录接口
const getGoodsList = (options) =>  http.post('/api/manage/product/list.do',options);

export {
  getGoodsList
} 