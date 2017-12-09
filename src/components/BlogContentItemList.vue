<template>
  <div id="BlogContentItemList">
    <div class="BlogContentListMain" >
      <div class="blog" v-for="blog in displayblogs">
        <div class="title">
          <p><a @click="">{{blog.title}}</a></p>
          <span>发布时间：{{ blog.add_time }}</span>
        </div>
        <div class="tags">
          <span>标签：</span>
          <a><el-tag type="primary">这里以后添加tag标签</el-tag></a>
        </div>
        <div class="brief">
          <!--<span>简述：</span>-->
          <div>{{ blog.blog_brief }}</div>
          <!--<div v-html="changeMarkdownStyle(article.attributes.content)"></div>-->
        </div>
        <div class="readmore">
          <a @click="">阅读全文</a>
        </div>
      </div>
      <!--Todo： 这里应该添加分页效果-->
      <div class="blog_pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSize"
          :page-size="currentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="allblogs.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BlogContentItemList',
    props: {
      // 这个组件接收唯一的参数，就是时间的数组集合
      allblogs: Array,
    },
    data() {
      return {
        displayblogs: [],
        currentPage: 1,
        currentPageSize: 5,
        pageSize: [5, 10],
      };
    },
    created() {
      console.log('666666666666666666')
      // this.allBlogs = this.getblogs;
      // this.blogFilt();
      // this.getYears();
    },
    watch: {
      // 观察allblogs
      allblogs(val) {
        console.log('watchallblogs');
        console.log(val);
        this.initDisplayBlogs(this.currentPage, this.currentPageSize);
      },
    },
    computed: {
    },
    methods: {
      handleSizeChange(val) {
        this.currentPage = 1;
        this.currentPageSize = val;
        // 刷新显示的部分第一页
        this.initDisplayBlogs(1, val);
      },
      handleCurrentChange(val) {
        this.initDisplayBlogs(val, this.currentPageSize);
      },
      initDisplayBlogs(page, size) {
        const startpoint = (page - 1) * size;
        const endpoint = (page * size);
        this.displayblogs = this.allblogs.slice(startpoint, endpoint);
      },
    },
    mounted() {
      // 渲染需要显示的blog列表
      this.initDisplayBlogs(this.currentPage, this.currentPageSize);
    },
  };
</script>

<style>
@import "../assets/css/BlogContentItemList.css";

</style>

