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

