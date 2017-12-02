import * as types from './mutations_type.js'
import Vue from 'vue'

// state
export const state = {
  books: []
};

// mutations
export const mutations = {
  // action 發出 commit 會對應到 mutation 使用的是 Object key 方式
  [types.SAVEBOOKS] (state, books) {
    // 在 mutation 改變 state（只有 mutation 可以改變！）
    state.books = books;
  },
};
