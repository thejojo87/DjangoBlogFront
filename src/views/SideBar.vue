<template>
  <div id="sidebar">
    <h1 class="article-title">Contents</h1>
    <ul id="book-listul" class="book-list">
      <li v-on:click="goBook(item)" :class=" {activeBook: index == activeBookIndex} " v-for="(item,index) in allBooks">
        <p>{{ item.name }}</p>
        <span class="sidebar-number">
            {{ item.blogs.length }}篇
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { getBooks } from '../apis/apis';
  import cookie from '../assets/js/cookie';

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
        if (!this.$route.params.bookId) {
          // 点击了首页，需要清空
          this.actionSaveActiveBook();
        }
        // 当从首页直接点击blog列表的时候需要更新activebook
        if (this.$route.params.bookId && typeof (this.getActiveBook) === 'undefined') {
          console.log('0a9sdufi iajdfsi')
          this.getbooks.forEach((item, index) => {
            console.log(typeof item.id)
            if (item.id.toString() === this.$route.params.bookId) {
              this.actionSaveActiveBook(item);
            }
          });
        }
      },
      getUserInfo(val, oldVal) {
        console.log('用户信息改变了，登录或者注册了');
        this.getSidebarBooks();
      },
    },
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getbooks: 'getBooks',
        getUserInfo: 'getUserInfo',
        getActiveBook: 'getActiveBook',
      }),
    },
    methods: {
      ...mapActions([
        'actionSaveBooks',
        'actionSaveActiveBook',
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
        // 保存activebook
        this.actionSaveActiveBook(item);
        this.$router.push(address);
      },
      getSidebarBooks() {
        let name = cookie.getCookie('name');
        getBooks({
          params: {
            username: name,
          },
        }).then((response) => {
          this.allBooks = response.data.results;
          // 这里要存储获取到的books数据
          this.actionSaveBooks(response.data.results);
          this.setActiveBook();
          // 刷新的时候需要按照router的地址来设置activebook
          const bookid = this.$route.params.bookId;
          // 设置activebook，如果地址里bookid不存在。那么就为-1
          if (bookid) {
            let index = 0;
            for (let book of this.allBooks) {
              if (book.id.toString() === bookid) {
                this.actionSaveActiveBook(book);
              }
              index++;
            }
          }
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
          // this.actionSaveActiveBook();
        }
      },
    },
    created() {
      this.getSidebarBooks(); // 获取文集
    },
    mounted() {
    },
  };
</script>

<style>
  @import "../assets/css/SideBar.css";
</style>
