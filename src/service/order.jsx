import http from 'util/http.jsx';


// 订单List
const getOrderList = (options) =>  http.get('/api/manage/order/list.do',options);
// 按订单号查询
const getOrderSearch = (options) =>  http.get('/api/manage/order/search.do',options);
// 订单详情 
const getOrderDetail= (options) =>  http.get('/api/manage/order/detail.do',options);

export {
  getOrderList,
  getOrderSearch,
  getOrderDetail
} 