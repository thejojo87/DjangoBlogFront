import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
// import SideBar from '@/views/SideBar'
import BlogList from '@/views/BlogList';
import BlogContent from '@/views/BlogContent';
import BlogContentList from '@/components/BlogContentList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        home: Home,
      },
      children: [
        {
          // 配置主页
          path: '',
          components: {
            bloglist: BlogList,
            blogcontent: BlogContentList,
          }
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'reader/books/:bookId',
          components: {
            bloglist: BlogList,
            blogcontent: BlogContentList,
          },
        },
        {
          // 配置blog
          path: 'reader/books/:bookId/blogs/:blogId',
          components: {
            bloglist: BlogList,
            blogcontent: BlogContent,
          }
        },
      ]
    },
  ],
});
