import http from 'util/http.jsx';


// 登录接口
const getGoodsList = (options) =>  http.post('/api/manage/product/list.do',options);
// 上下架接口
const getGroundingOrUndercarriage = (options) =>  http.get('/api/manage/product/set_sale_status.do',options);
// 搜索接口
const getSearch = (options) =>  http.get('/api/manage/product/search.do',options)
export {
  getGoodsList,
  getGroundingOrUndercarriage,
  getSearch
} 