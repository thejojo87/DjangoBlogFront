import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
// import SideBar from '@/components/SideBar'

Vue.use(Router);

// Vue.component('my-sidebar', SideBar)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ],
});
