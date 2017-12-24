<template>
  <div id="header">
    <div id="header-upper">
      <!--网站标题和注册和登录链接-->
      <h1>Life Gallery</h1>

      <div class="header-upper-buttons" v-if="userInfo.name">
        <!--这里以后要写个个人账户界面-->
        <el-button id="header-upper-write" @click="gowrite" type="success" round size="mini">写文章</el-button>
      <router-link :to="{ path: '/Home' }"><a href="" @click=""><img src="../assets/image/login.png" alt=""/>{{ userInfo.name }}</a></router-link>
      <!--退出之后要返回主页-->
        <router-link :to="{ name: 'Login' }"><a href="" @click="logout()"><img src="../assets/image/logout.png" alt=""/>退出</a></router-link>
      </div>
      <div class="header-upper-buttons" v-else>

        <router-link :to="{ name: 'Register' }"><a href="" @click=""><img src="../assets/image/login.png" alt=""/>注册</a></router-link>
        <router-link :to="{ name: 'Login' }"><a href="" @click=""><img src="../assets/image/logout.png" alt=""/>登录</a></router-link>
      </div>
    </div>
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
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Header',
    data() {
      return {
        activeName: 'home',
      };
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
      }),
    },
    methods: {
      ...mapActions([
        'actionSaveActiveBlog',
      ]),
      logout() {
        // 以后看看再说，没准会有用呢这个
      },
      gowrite() {
        // 清空activeblog
        this.actionSaveActiveBlog();
        this.$router.push('/writer');
      },
      handleClick(tab) {
        switch (tab.label) {
          case '主页':
            this.$router.push('/');
            break;
          default:
        }
      },
    },
  };
</script>

<style>
  @import "../assets/css/Header.css";
</style>
