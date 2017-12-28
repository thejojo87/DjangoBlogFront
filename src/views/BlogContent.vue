<template>
  <div id="blogcontent">
    <div id="blogcontenthead">
      <div id="blogcontenttitle">
        <span><h4>{{ title }}</h4></span>
      </div>
      <div id="blogcontentdesc">
        {{ brief }}
      </div>
    </div>
    <article id="blogcontentbody">
      <div v-marked="this.main"></div>
    </article>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import VueMarkdown from 'vue-markdown';

  export default {
    name: 'BlogContent',
    components: {
      VueMarkdown,
    },
    data() {
      return {
        title: '',
        brief: '',
        main: '',
      };
    },
    watch: {
      $route(to, from) {
      },
      getActiveBlog(val, oldVal) {
        if (val) {
          this.title = val.title;
          this.brief = val.blog_brief;
          this.main = val.blog_main;
        }
      },
      getIsEditingBlogMain(val,oldVal) {
        this.main = this.getActiveBlog.blog_main;
      },
      getIsEditingBlogTitle(val,oldVal) {
        this.title = this.getActiveBlog.title;
      },
      getIsEditingBlogBrief(val,oldVal) {
        this.brief = this.getActiveBlog.blog_brief;
      },
    },
    created() {
    },
    mounted() {
      this.title = this.getActiveBlog.title;
      this.brief = this.getActiveBlog.blog_brief;
      this.main = this.getActiveBlog.blog_main;
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getActiveBlog: 'getActiveBlog',
        getIsEditingBlogMain: 'getIsEditingBlogMain',
        getIsEditingBlogTitle: 'getIsEditingBlogTitle',
        getIsEditingBlogBrief: 'getIsEditingBlogBrief',
      }),
    },
    methods: {
    },
  };
</script>

<style>
  @import "../assets/css/BlogContent.css";
</style>

