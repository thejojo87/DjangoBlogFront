import axios from 'axios';

// 服务器端口
let host = 'http://127.0.0.1:8000';

// 获取商品类别信息
export const getBooks = params => {
  if('id' in params){
    return axios.get(`${host}/books/` + params.id + '/');
  }
  else {
    return axios.get(`${host}/books/`, params);
  }
};

// 登录
export const login = params => {
  console.log('login函数发送了');
  return axios.post(`${host}/login/`, params);
}

// 注册
export const register = parmas => {
  return axios.post(`${host}/users/`, parmas);
};

// 修改bookname
export const updateBookName = (bookId, params) => {
  return axios.patch(`${host}/books/` + bookId + '/', params);
};

// 删除book
export const deleteBook = (bookId, params) => {
  return axios.delete(`${host}/books/` + bookId + '/', params);
};

// 新建book
export const createBook = params => {
  return axios.post(`${host}/books/`, params);
};

// 新建blog
export const createBlog = params => {
  return axios.post(`${host}/blogs/`, params);
};

// 删除blog
export const deleteBlog = (blogId, params) => {
  return axios.delete(`${host}/blogs/` + blogId + '/', params);
};


// 修改blog
export const updateBlog = (params) => {
  return axios.patch(`${host}/blogs/` + params.id + '/', params);
};
