<template>
  <div class="bloglistitem" v-on:click="goBlogContent()">
    <div class="itemtitletime">
      <div class="itemtitle">{{ item.title }}
      </div>
      <div class="itemtime">{{ item.add_time }}</div>
    </div>
    <div class="itemdesc">
      {{ item.blog_brief }}
    </div>
    <div class="itemtagauthor">
    <div class="itemtag">
      <i class="el-icon-tickets"></i>   这里以后添加tag部分
    </div>
      <div class="itemauthor">
        {{ item.user }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'BlogListItem',
    props: {
      item: Object,
      index: Number,
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        // getblogs: 'getBlogs',
        // getActiveBlog: 'getActiveBlog',
        // getActiveBook: 'getActiveBook',
      }),
    },
    methods: {
      ...mapActions([
        'actionSaveActiveBlog',
        'actionSaveActiveBook',
      ]),
      goBlogContent() {
        // 意味着没有点击book就直接点击了blog文章列表
        // 要从item获取book的id然后push
        let address;
        if (!this.$route.params.bookId) {
          // 从首页点击了blog
          address = 'reader/books/' + this.item.book + '/blogs/' + this.item.id;
        } else {
          if (this.$route.params.blogId) {
            // 从blog里点击了blog
            address = this.item.id.toString()
          }else {
            // 从book里，点击了blog
            address = this.item.book + '/blogs/' + this.item.id;
          }
        }
        this.$router.push(address);
        this.actionSaveActiveBlog(this.item);
      },
    },
  };
</script>

<style>
  @import "../assets/css/BlogListItem.css";
</style>

