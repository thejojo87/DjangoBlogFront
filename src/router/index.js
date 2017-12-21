import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
// import SideBar from '@/views/SideBar'
import BlogList from '@/views/BlogList';
import BlogContent from '@/views/BlogContent';
import BlogContentList from '@/components/BlogContentList';
import Login from '@/views/register/Login';
import Register from '@/views/register/Register';
import Writer from '@/views/Writer/Writer';
import WriterBookList from '@/views/Writer/WriterBookList';

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
          },
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'login',
          name: 'Login',
          components: {
            bloglist: BlogList,
            blogcontent: Login,
          },
          meta: {
            title: '登录',
            need_log: false,
          },
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'register',
          name: 'Register',
          components: {
            bloglist: BlogList,
            blogcontent: Register,
          },
          meta: {
            title: '注册',
            need_log: false,
          },
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
          },
        },
      ],
    },
    {
      path: '/writer',
      name: 'Writer',
      components: {
        home: Writer,
      },
      children: [
        {
          // 配置编辑器主页
          path: '',
          components: {
            writerbooklist: WriterBookList,
            // writerbloglist: BlogContentList,
            // writereditor: BlogContentList,
          },
        },
        {
          // 配置主页
          path: 'books/:bookId',
          components: {
            writerbooklist: WriterBookList,
            // writerbloglist: BlogContentList,
            // writereditor: BlogContentList,
          },
        },
      ],
    },
  ],
});
