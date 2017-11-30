<template>
  <div id="sidebar">
    <h1 class="article-title">Contents</h1>
    <ul id="book-listul" class="book-list">
      <li v-for="(item,index) in allBooks">
        <a href="/">{{ item.name }}</a>
        <!--<span id="comma">-->
        <!--..........................-->
        <!--</span>-->
        <span id="sidebar-number">16篇</span>
      </li>
    </ul>
    <!--<hr>-->
  </div>
</template>

<script>
  import { getBooks } from '../apis/apis';

  export default {
    name: 'SideBar',
    data() {
      return {
        allBooks: [], // 所有文集
        message: 'Hello Vue!',
      };
    },
    methods: {
      getSidebarBooks() {
        console.log('getBooks开始了');
        getBooks({
          params: {},
        }).then((response) => {
          console.log(response);
          this.allBooks = response.data.results;
          console.log(this.allBooks);
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
