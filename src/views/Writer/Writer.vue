<template>
  <div id="Writer">
    <router-view name="writerbooklist"></router-view>
    <router-view name="writerbloglist"></router-view>
    <router-view name="writereditor"></router-view>
    <!--<writer-book-list></writer-book-list>-->
  </div>
</template>

<script>
  import WriterBookList from './WriterBookList';

  export default {
    name: 'Writer',
    components: {
      WriterBookList,
    },
    computed: {
    },
    methods: {
    },
  };
</script>

<style>
#Writer {
  display: flex;
  height: 100%;
  background-color: #f0ad4e;
}

</style>

