<template>
  <div id="bloglist">
    <ul id="blog-list" class="">
      <li :class=" {activeBlog: index == activeBlogIndex} " v-for="(item,index) in blogs">
        <router-link v-on:click.native="activeBlogIndex = index" :to="'/'">
          aaaaaa{{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'BlogList',
    data() {
      return {
        blogs: [], // 所有文集
        activeBlogIndex: 0,
      };
    },
    created: function () {
      console.log('BlogListCreated')
      // 这里要初始化blog的列表
      this.blogs = this.getblogs;
    },
    watch: {
      '$route': function (to, from) {
        this.blogs = this.getblogs;
        let bookid = this.$route.params.bookId;
        if (bookid) {
          // 那么就意味着进入了特定的书，进行筛选并返回
          this.blogs = this.blogsFilter(this.blogs, bookid)
        } else {
        }
      },
      getblogs: function (val, oldVal) {
        this.blogs = val;
      }
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getblogs: 'getBlogs',
      }),
      // this.getblogs();
    },
    methods: {
      blogsFilter(blogs) {
        let filtedBlogs = [];
        for (let blog of blogs) {
          if (blog.book.id.toString() === this.$route.params.bookId) {
            filtedBlogs.push(blog)
          }
        }
        return filtedBlogs
      },
    },
  };
</script>

<style>
  #bloglist {
    background-color: green;
    height: 100%;
  }

</style>

