import Vue from 'vue';
import * as types from './mutations_type';
import cookie from '../assets/js/cookie';

// 数据模块
const userInfo = {
  name: cookie.getCookie('name') || '',
  token: cookie.getCookie('token') || '',
};
// state
export const state = {
  books: [],
  activeBlog: null,
  userInfo,
};

// mutations
export const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  [types.SAVEBOOKS](state, books) {
    // 在 mutation 改變 state（只有 mutation 可以改變！）
    state.books = books;
  },
  // 保存当前阅读的blog数据
  [types.SAVEACTIVEBLOG](state, blog) {
    // 在 mutation 改變 state（只有 mutation 可以改變！）
    state.activeBlog = blog;
  },
  [types.SET_INFO](state) {
    state.userInfo = {
      name: cookie.getCookie('name'),
      token: cookie.getCookie('token'),
    };
  },
  // 修改bookname
  [types.UPDATEBOOKNAME](state, book) {
    state.books.forEach(function (item, index) {
      if (item.id === book.id) {
        item.name = book.name;
      }
    });
  },
  // 删除book
  [types.DELETEBOOK](state, bookid) {
    state.books = state.books.filter(function (item) {
      return item.id !== bookid;
    });
  },
  // 新建book
  [types.CREATEBOOK](state, book) {
    console.log(book);
    state.books.push(book);
  },
};
