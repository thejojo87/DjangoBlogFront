import axios from 'axios'

// 服务器端口
let host = 'http://127.0.0.1:8000';

//获取商品类别信息
export const getBooks = params => {
  if('id' in params){
    return axios.get(`${host}/books/`+params.id+'/');
  }
  else {
    return axios.get(`${host}/books/`, params);
  }
};
