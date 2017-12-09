<template>
  <div id="bloglist">
    <blog-list-item :class=" {activeBlog: index == activeBlogIndex} " v-for="(item,index) in allBlogs" :key="item.id" :index="index" :item="item"></blog-list-item>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import BlogListItem from '../components/BlogListItem';

  export default {
    name: 'BlogList',
    components: {
      BlogListItem,
    },
    data() {
      return {
        allBlogs: [], // 所有文集
        activeBlogIndex: -1,
      };
    },
    created() {
    },
    watch: {
      $route(to, from) {
        this.allBlogs = this.getblogs;
        this.blogFilt();
        this.setActiveBlog();
      },
      getblogs(val, oldVal) {
        this.allBlogs = val;
        this.blogFilt();
        // 刷新的时候更新activeblog状态
        this.setActiveBlog();
      },
      activeBlogIndex(val) {
        // 在这里vuex里存入现在的blog信息
        this.actionSaveActiveBlog(this.allBlogs[val]);
      },
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getblogs: 'getBlogs',
        getActiveBlog: 'getActiveBlog',
      }),
    },
    methods: {
      ...mapActions([
        'actionSaveActiveBlog',
      ]),
      blogFilt() {
        const bookid = this.$route.params.bookId;
        if (bookid) {
          // 那么就意味着进入了特定的书，进行筛选并返回
          this.allBlogs = this.blogsFilter(this.allBlogs, bookid);
        } else {
        }
      },
      blogsFilter(blogs) {
        let filtedBlogs = [];
        for (let blog of blogs) {
          if (blog.book.id.toString() === this.$route.params.bookId) {
            filtedBlogs.push(blog);
          }
        }
        return filtedBlogs;
      },
      setActiveBlog() {
        let blogid = this.$route.params.blogId;
        // 设置activebook，如果地址里bookid不存在。那么就为-1
        if (blogid) {
          let index = 0;
          for (let blog of this.allBlogs) {
            if (blog.id.toString() === blogid) {
              this.activeBlogIndex = index;
            }
            index++;
          }
        } else {
          this.activeBlogIndex = -1;
        }
      },
    },
  };
</script>

<style>
  @import "../assets/css/BlogList.css";
</style>

