<template>
<div id="sidebar">
  <h1 class="article-title">Contents</h1>
  <ul id="book-listul" class="book-list">
    <li v-for="value in items">
      <!--这里应该是a链接-->
      <a href="/">{{ value }}</a>
      <span>
        ..........................
      </span>
      <span id="sidebar-number">16篇</span>
    </li>
  </ul>
  <!--<hr>-->
</div>
</template>

<script>

  export default {
    name: 'SideBar',
    data() {
      return {
        message: 'Hello Vue!',
        items: [
          'test',
          'ateafds88888888888888888888888888888888',
          'ateafds88888888888888888888888888888888',
          'ateafds88888888888888888888888888888888',
          'ateafds88888888888888888888888888888888',
          'ateafds88888888888888888888888888888888',
          'ateafds88888888888888888888888888888888',
          { message: 'Foo' },
          { message: 'Bar' },
          { message: 'Foo' },
          { message: 'Bar' },
//          { message: 'Foo' },
//          { message: 'Bar' },
//          { message: 'Bar' },
        ],
      };
    },
  };
</script>

<style>
  @import "../assets/css/SideBar.css";
</style>
