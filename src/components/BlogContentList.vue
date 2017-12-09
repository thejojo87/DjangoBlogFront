<template>
  <div class="BlogContentList">
    <!--<my-timepicker :allyears="years" :allmonth="months"></my-timepicker>-->
    <my-blogcontentitemlist :allblogs="allBlogs"></my-blogcontentitemlist>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import TimePicker from './TimePicker';
  import BlogContentItemList from './BlogContentItemList';

  export default {
    name: 'BlogContentList',
    data() {
      return {
        allBlogs: [], // 所有文集
        // hackReset: false,
        // months: [],
        allyears: [], // 所有年份组合
        years: [], // 去掉当前年份要传送进去
        filtedBlogs: {}, // 按照年份分类好的数据，
        months: {}, // 要传送进去的字典
      };
    },
    created() {
      console.log('88888888888888888888888888888888')
      console.log('88888888888888888888888888888888')
      console.log('88888888888888888888888888888888')
      console.log('88888888888888888888888888888888')
      console.log('88888888888888888888888888888888')
      console.log('88888888888888888888888888888888')
      this.allBlogs = this.getblogs;
      this.blogFilt();
      this.getYears();
      console.log(this.allBlogs);
    },
    watch: {
      $route(to, from) {
        this.allBlogs = this.getblogs;
        this.blogFilt();
        this.getYears();
      },
      getblogs(val, oldVal) {
        this.allBlogs = val;
        this.blogFilt();
        this.getYears();
        // 刷新的时候更新activeblog状态
      },
    },
    components: {
      'my-timepicker': TimePicker,
      'my-blogcontentitemlist': BlogContentItemList,
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getblogs: 'getBlogs',
      }),
    },
    methods: {
      getYears() {
        this.allyears = this.allBlogs.map(blogs => blogs.add_time_year);
        this.years = this.allyears.filter(year => year !== String(new Date().getFullYear()));
        // 因为有个默认的当前年，所以要把这个给去掉。
        this.getMonth();
      },
      getMonth() {
        // 我是不是需要知道选择了什么年份呢？
        // 还是说？二维数组？这里要生成什么样的格式呢？
        // 先按照年份分类blog
        console.log(this.allBlogs)
        this.allyears.forEach((item, index) => {
          this.filtedBlogs[item] = this.allBlogs.filter(blogs => blogs.add_time_year === item);
        });
        console.log(this.filtedBlogs);
        // 然后获取字典里的所有key
        const keys = Object.keys(this.filtedBlogs);
        console.log(keys);
        // 对每一个key，开始遍历，从第一步按照年份分类好的blog里，筛选月份，然后存入blogs数组里
        keys.forEach((item, index) => {
          this.months[item] = this.filtedBlogs[item].map(blogs => blogs.add_time_month);
        });
        console.log(this.months);
      },
      blogFilt() {
        const bookid = this.$route.params.bookId;
        if (bookid) {
          // 那么就意味着进入了特定的书，进行筛选并返回
          console.log('999999')
          this.allBlogs = this.blogsFilter(this.allBlogs, bookid);
          console.log(this.allBlogs)
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
    },
  };
</script>

<style>
  @import "../assets/css/BlogContentList.css";
</style>

