<template>
<div id="mainbar">

  <el-container>
    <el-aside width="300px">
      <router-view name="bloglist"></router-view>
      </el-aside>
    <el-main>
      <router-view name="blogcontent"></router-view>
    </el-main>
  </el-container>

</div>
</template>

<script>
//    import {mapGetters, mapActions} from 'vuex'

    export default {
      name: 'MainBar',
      computed: {
//            ...mapGetters({})
      },
      methods: {
//            ...mapActions([])
      },
    };
</script>

<style>
  @import "../assets/css/MainBar.css";
</style>
