<template>
  <div id="WriterBlogList">
    <div class="new_article">
      <div class="new_article_header"  @click="createNewBlog()"  >
        <!--<Icon type="plus-circled" />-->
        <i class="el-icon-circle-plus"></i>
        <i class=""></i> 新建文章
      </div>
      <my-writerbloglist></my-writerbloglist>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { createBlog } from '../../apis/apis';
  import WriterBookList from '../../components/Writer/BlogList';

  export default {
    name: 'WriterBlogList',
    watch: {
      '$route': function (to, from) {
        console.log('route变化了')
        // this.setActiveBlog();
      },
      // 观察store里的books，自动更新本地books，在delete或者create的时候自动更新
      getActiveBook(val, oldVal) {
        // 刷新的时候更新activeblog状态
        if (this.getActiveBook.blogs[0]) {
          this.actionSaveActiveBlog(this.getActiveBook.blogs[0]);
        }
      },
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getActiveBook: 'getActiveBook',
      }),
    },
    components: {
      'my-writerbloglist': WriterBookList,
    },
    methods: {
      ...mapActions([
        'actionCreateBlog',
        'actionSaveActiveBlog',
      ]),
      createNewBlog() {
        // console.log(this.getActiveBook.id) ;
        createBlog({
          book: this.getActiveBook.id,
          title: '无标题文章',
          blog_brief: '文章简述',
        }).then((response) => {
          console.log(response.data);
          this.actionCreateBlog(response.data);
          this.actionSaveActiveBlog(response.data);
          this.goBlog(response.data);
        }).catch((error) => {
          console.log(error);
        });
      },
      // 新建之后需要跳转到新的blog网址
      goBlog(blog) {
        // 意味着没有点击book就直接点击了blog文章列表
        // 要从item获取book的id然后push
        let address;
        if (!this.$route.params.bookId) {
          // 从首页点击了新建blog
          address = 'writer/books/' + blog.book + '/blogs/' + blog.id;
        } else {
          if (this.$route.params.blogId) {
            // 从blog里点击了blog
            address = blog.id.toString();
          }else {
            // 从book里，点击了blog
            address = blog.book + '/blogs/' + blog.id;
          }
        }
        this.$router.push(address);
        // this.actionSaveActiveBlog(this.item);
      },
    },
  };
</script>

<style>
  @import "../../assets/css/Writer/WriterBlogList.css";
</style>

