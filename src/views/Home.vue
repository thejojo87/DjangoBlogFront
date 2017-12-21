<template>

  <el-container>
    <el-aside width="200px">
      <my-sidebar></my-sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <my-header>
        </my-header>
      </el-header>
      <el-main>
        <my-mainbar>

        </my-mainbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import SideBar from './SideBar';
  import Header from './Header';
  import MainBar from './MainBar';

  export default {
    name: 'Home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    components: {
      'my-sidebar': SideBar,
      'my-header': Header,
      'my-mainbar': MainBar,
    },
  };
</script>

<style>
  @import "../assets/css/Home.css";
</style>
