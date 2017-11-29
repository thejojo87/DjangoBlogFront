<template>

  <el-container>
    <el-aside>
      <my-sidebar></my-sidebar>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  import SideBar from './SideBar';

  export default {
    name: 'Home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
    components: {
      'my-sidebar': SideBar,
    },
  };
</script>

<style>
  @import "../assets/css/Home.css";

</style>
