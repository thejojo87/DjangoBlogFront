<template>
  <div id="WriterPreview">
    <div id="WriterPreviewEditor">
    <router-view name="writereditor"></router-view>
    </div>
    <div id="WriterPreviewView">
    <router-view name="writerpreviewview"></router-view>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'WriterPreview',
    computed: {
      // ...mapGetters 為 ES7 寫法
      ...mapGetters({
        // getBooks是vuex的获取存储的books用的
        getActiveBlog: 'getActiveBlog',
        getActiveBook: 'getActiveBook',
      }),
    },
    methods: {
      ...mapActions([
        'actionSaveActiveBlog',
        'actionSaveActiveBook',
      ]),
    },
    created() {
      console.log('createdpreview');
      this.$nextTick(() => {
        // this.createEditor();
        // 这是为了刷新
        // this.initEditor();

      });
    },
  };
</script>

<style>
  @import "../../assets/css/Writer/WriterPreview.css";
</style>

