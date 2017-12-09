<template>
  <div id="blogcontent">
    <div id="blogcontenthead">
      <div id="blogcontenttitle">
        <span><h4>{{ this.getActiveBlog.title }}</h4></span>
      </div>
      <div id="blogcontentdesc">
        {{ this.getActiveBlog.blog_brief }}
      </div>
    </div>
    <article id="blogcontentbody">
      {{ this.getActiveBlog.blog_main }}
    </article>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'BlogContent',
    watch: {
      $route(to, from) {
        // this.allBlogs = this.getblogs;
        // this.blogFilt();
        // this.setActiveBlog();
      },
    },
    created() {
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getActiveBlog: 'getActiveBlog',
      }),
    },
    methods: {
    },
  };
</script>

<style>
  @import "../assets/css/BlogContent.css";
</style>

