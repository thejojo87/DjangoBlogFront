<template>
  <div class="bloglistitem" v-on:click="goBlogContent">
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
  export default {
    name: 'BlogListItem',
    props: {
      item: Object,
      index: Number,
    },
    computed: {},
    methods: {
      goBlogContent() {
        // 意味着没有点击book就直接点击了blog文章列表
        // 要从item获取book的id然后push
        let address;
        if (!this.$route.params.bookId) {
          address = 'reader/books/' + this.item.book.id + '/blogs/' + this.item.id;
        } else {
          if (this.$route.params.blogId) {
            address = this.item.id.toString()
          }else {
            address = this.item.book.id + '/blogs/' + this.item.id;
          }
        }
        this.$router.push(address);
      }
    },
  };
</script>

<style>
  @import "../assets/css/BlogListItem.css";
</style>

