<template>
  <div id="sidebar">
    <h1 class="article-title">Contents</h1>
    <ul id="book-listul" class="book-list">
      <li v-on:click="goBook(item)" :class=" {activeBook: index == activeBookIndex} " v-for="(item,index) in allBooks">
          <!--<router-link :to="'/reader/books/'+item.id">-->
        <p>{{ item.name }}</p>
          <!--</router-link>-->
        <!--<span id="comma">-->
        <!--..........................-->
        <!--</span>-->
        <span class="sidebar-number">
            {{ item.blogs.length }}篇
        </span>
      </li>
    </ul>
    <!--<hr>-->
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { getBooks } from '../apis/apis';

  export default {
    name: 'SideBar',
    data() {
      return {
        allBooks: [], // 所有文集
        activeBookIndex: -1,
      };
    },
    watch: {
      '$route': function (to, from) {
        this.setActiveBook();
      },
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getbooks: 'getBooks',
      }),
    },
    methods: {
      ...mapActions([
        'actionSaveBooks',
      ]),
      goBook(item) {
        // 意味着没有点击book就直接点击了blog文章列表
        // 要从item获取book的id然后push
        let address;
        if (!this.$route.params.bookId) {
          // 从首页直接点击book
          address = 'reader/books/' + item.id;
        } else {
          if (!this.$route.params.blogId) {
            // 从books点击books，blogid不存在
            address = item.id.toString();
          } else {
            // 从blogs点击books
            address = '/reader/books/' + item.id;
          }
        }
        this.$router.push(address);
      },
      getSidebarBooks() {
        getBooks({
          params: {},
        }).then((response) => {
          this.allBooks = response.data.results;
          // 这里要存储获取到的books数据
          this.actionSaveBooks(response.data.results);
          this.setActiveBook();
        })
        .catch((error) => {
        });
      },
      setActiveBook() {
        const bookid = this.$route.params.bookId;
        // 设置activebook，如果地址里bookid不存在。那么就为-1
        if (bookid) {
          let index = 0;
          for (let book of this.allBooks) {
            if (book.id.toString() === bookid) {
              this.activeBookIndex = index;
            }
            index++;
          }
        } else {
          this.activeBookIndex = -1;
        }
      },
    },
    created() {
      this.getSidebarBooks(); // 获取文集
    },
  };
</script>

<style>
  @import "../assets/css/SideBar.css";
</style>
