<template>
<div id="header">
<div id="header-upper">
  <!--网站标题和注册和登录链接-->
  <h1>Life Gallery</h1>
  <a href="/" @click=""><img src="../assets/image/login.png"  alt="" />注册</a>
  <a href="/" @click=""><img src="../assets/image/logout.png"  alt="" />登录</a>

</div>
<!--<div id="header-tabs">-->
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="主页" name="home"></el-tab-pane>
    <el-tab-pane label="归档" name="archieve"></el-tab-pane>
    <el-tab-pane label="标签" name="tag"></el-tab-pane>
    <el-tab-pane label="Timeline" name="timeline"></el-tab-pane>
    <el-tab-pane label="关于" name="about"></el-tab-pane>
    <el-tab-pane label="友链" name="links"></el-tab-pane>
    <el-tab-pane label="开源" name="opensource"></el-tab-pane>
    <el-tab-pane label="搜索" name="search"></el-tab-pane>
  </el-tabs>
<!--</div>-->
  </div>
</template>

<script>

    export default {
      name: 'Header',
      data() {
        return {
          activeName: 'home',
          };
        },
      computed: {
      },
      methods: {
        handleClick(tab) {
          switch (tab.label)
          {
            case '主页':
              this.$router.push('/');
              break;
            default:
          }
        },
      }
    };
</script>

<style>
  @import "../assets/css/Header.css";
</style>
