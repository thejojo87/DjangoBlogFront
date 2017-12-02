<template>
  <div id="sidebar">
    <h1 class="article-title">Contents</h1>
    <ul id="book-listul" class="book-list">
      <li :class=" {activeBook: index == activeBookIndex} " v-for="(item,index) in allBooks">
          <router-link  v-on:click.native="activeBookIndex = index" :to="'/reader/books/'+item.id">
            {{ item.name }}
          </router-link>
        <!--<span id="comma">-->
        <!--..........................-->
        <!--</span>-->
        <span id="sidebar-number">
            {{ item.blogs.length }}篇
        </span>
      </li>
    </ul>
    <!--<hr>-->
  </div>
</template>

<script>
  import { getBooks } from '../apis/apis';
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'SideBar',
    data() {
      return {
        allBooks: [], // 所有文集
        activeBookIndex: -1,
      };
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
      getSidebarBooks() {
        getBooks({
          params: {},
        }).then((response) => {
          console.log(response);
          this.allBooks = response.data.results;
          // 这里要存储获取到的books数据
          this.actionSaveBooks(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
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
