import http from 'util/http.jsx';

// 品类接口
const getCategory = (options) =>  http.get('/api/manage/category/get_category.do',options);

export {
  getCategory
} 