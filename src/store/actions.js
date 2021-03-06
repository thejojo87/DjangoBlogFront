// import Vue from 'vue';
// import mutations from './mutations';
// 引入 mutations_type （引用同一個 key）
import * as types from './mutations_type';

function makeAction(type) {
  return ({ commit }, ...args) => commit(type, ...args);
};

export const actionSaveBooks = ({ commit }, books) => {
  commit(types.SAVEBOOKS, books);
};

export const actionSaveActiveBlog = ({ commit }, blog) => {
  commit(types.SAVEACTIVEBLOG, blog);
};

export const actionSaveActiveBook = ({ commit }, book) => {
  commit(types.SAVEACTIVEBOOK, book);
};

// 保存用户信息和token
export const actionSetInfo = makeAction(types.SET_INFO);

// 修改bookname
export const actionUpdateBookName = ({ commit }, book) => {
  commit(types.UPDATEBOOKNAME, book);
};

// 删除book
export const actionDeleteBook = ({ commit }, bookid) => {
  commit(types.DELETEBOOK, bookid);
};

// 新建book
export const actionCreateBook = ({ commit }, book) => {
  commit(types.CREATEBOOK, book);
};

// 新建blog
export const actionCreateBlog = ({ commit }, blog) => {
  commit(types.CREATEBLOG, blog);
};

// 删除blog
export const actionDeleteBlog = ({ commit }, blogid) => {
  commit(types.DELETEBLOG, blogid);
};

// 修改blog
export const actionUpdateBlog = ({ commit }, Data) => {
  commit(types.UPDATEBLOG, Data);
};
