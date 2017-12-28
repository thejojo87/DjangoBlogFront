function sortBlogs(field) {
  return function (a, b) {
    return b[field] - a[field];
  };
}

export const getBlogs = state => {
  let blogs = [];
  for (let book of state.books) {
    if (book.blogs.length !== 0) {
      for (let blog of book.blogs) {
        blogs.push(blog)
      }
    }
  }
  blogs = blogs.sort(sortBlogs("id"));
  return blogs;
};
export const getBooks = state => {
  return state.books;
};

export const getActiveBlog = state => {
  return state.activeBlog;
};

export const getActiveBook = state => {
  return state.activeBook;
};

// 用户信息token
export const getUserInfo = state => {
  return state.userInfo;
};

// 获取是否在编辑blogmain
export const getIsEditingBlogMain = state => {
  return state.isEditingBlogMain;
};

// 获取是否在编辑blogtitle
export const getIsEditingBlogTitle = state => {
  return state.isEditingBlogTitle;
};

// 获取是否在编辑blogbrief
export const getIsEditingBlogBrief = state => {
  return state.isEditingBlogBrief;
};

