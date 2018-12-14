import http from 'util/http.jsx';


// 登录接口
const getHomeCount = (options) =>  http.post('/api/manage/statistic/base_count.do',options);

export {
  getHomeCount
} 