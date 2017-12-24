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
        console.log('alksdfj')
        // this.setActiveBlog();
        if (!this.$route.params.blogId) {
          // 点击了首页，需要清空
          this.actionSaveActiveBlog();
        } else {
          if (!this.getActiveBlog) {
            // if (this.getActiveBlog === null || typeof (this.getActiveBlog) === 'undefined') {
            console.log('0add')
            this.getblogs.forEach((item, index) => {
              console.log(typeof item.id)
              if (item.id.toString() === this.$route.params.blogId) {
                this.actionSaveActiveBlog(item);
              }
            });
          }
        }
        // 当blogid存在，但是activeblog为空的时候，比如从writer返回后，active为空，直接点击阅读全文

        this.setActiveBlog();
      },
      getblogs(val, oldVal) {
        // 刷新的时候更新activeblog状态
        if (!this.$route.params.bookId) {
          // 意味着从首页刷新了，所以这里bloglist应该是全部blog列表
          this.allBlogs = val;
        } else {
          if (!this.$route.params.blogId) {
            // 从books刷新了，blogid不存在，不用管了。
          } else {
            // 从blogs刷新了
            val.forEach((item, index) => {
              if (item.id.toString() === this.$route.params.blogId) {
                this.actionSaveActiveBlog(item);
              }
            });
          }
        }
      },
      getActiveBook(val, oldVal) {
        if (!val) {
          this.allBlogs = this.getblogs;
        } else {
          this.allBlogs = val.blogs;
        }
        this.setActiveBlog();
      },

    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getblogs: 'getBlogs',
        getActiveBlog: 'getActiveBlog',
        getActiveBook: 'getActiveBook',
      }),
    },
    methods: {
      ...mapActions([
        'actionSaveActiveBlog',
      ]),
      setActiveBlog() {
        let blogid = this.$route.params.blogId;
        // 设置activebook，如果地址里bookid不存在。那么就为-1
        if (blogid) {
          // blogid 存在,设置activeindex
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
    mounted() {
      // 刷新的时候需要按照router的地址来设置activebook
      // this.getSidebarBooks(); // 获取文集
    },
  };
</script>

<style>
  @import "../assets/css/BlogList.css";
</style>

