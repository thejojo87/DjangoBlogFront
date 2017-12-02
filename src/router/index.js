import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
// import SideBar from '@/components/SideBar'
import BlogList from '@/components/BlogList';
import BlogContent from '@/components/BlogContent';
import Test1 from '@/components/test1';

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
            blogcontent: BlogContent,
          }
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'reader/books/:bookId',
          components: {
            bloglist: BlogList,
            blogcontent: BlogContent,
          }
        },
      ]
    },
  ],
});
