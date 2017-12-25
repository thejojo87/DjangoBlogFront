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
  activeBook: null,
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
  // 保存当前阅读的book数据
  [types.SAVEACTIVEBOOK](state, book) {
    // 在 mutation 改變 state（只有 mutation 可以改變！）
    state.activeBook = book;
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
    state.books.push(book);
  },
  // 新建blog
  [types.CREATEBLOG](state, blog) {
    state.books.forEach(function (item, index) {
      if (item.id === blog.book) {
        item.blogs.push(blog);
      }
    });
  },
  // 删除blog
  [types.DELETEBLOG](state, blogid) {
    state.books.forEach(function (item, index) {
      if (item.id === state.activeBook.id) {
        console.log(item);
        item.blogs = item.blogs.filter((blogitem) => {
          return blogitem.id !== blogid;
        });
      }
    });
  },
  // 修改blog
  [types.UPDATEBLOG](state, Data) {
    state.books.forEach(function (item, index) {
      if (item.id === Data.data.book.id) {
        // 找到了对应的book
        item.blogs.forEach(function (blogitem, index) {
          if (blogitem.id === Data.data.id) {
            console.log('找到了');
            // 一共需要修改的有四个属性，title，brief，main，belongbook
            switch (Data.attribute) {
              case 'title':
                blogitem.title = Data.data.title;
                break;
              case 'blog_brief':
                blogitem.blog_brief = Data.data.blog_brief;
                break;
              case 'blog_main':
                blogitem.blog_main = Data.data.blog_main;
                break;
              case 'book':
                blogitem.book = Data.data.book;
                break;
              default:
                console.log('进行升级');
            }
            // blogitem.Data.data.attribute
          }
        });
      }
    });
  },
};
