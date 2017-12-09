<template>
  <div class="TimePicker">
    <div class="picker-inner">
      <div class="picker-year-close"     @mouseenter="handleMouseenter"
           @mouseleave="handleMouseleave" ref="yearpicker">
        <a href="#" class="" v-on:click="setActiveYear(defaultyear)">{{ defaultyear }}</a>
        <a href="#" v-on:click="setActiveYear(year)" v-for="year in allyears" v-bind:class="isYearClose">{{ year }}</a>
      </div>
      <div class="picker-month timeline">
        <ol >
          <li v-for="month in months" v-on:click="test()">
            <div>
              <time class="picker-month-time" :class="{'picker-month-active': isActiveMonth(month)}">{{month}}月</time>
            </div>
          </li>
        </ol>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'TimePicker',
    props: {
      // 这个组件接收唯一的参数，就是时间的数组集合
      allyears: Array,
      allmonth: Object,
    },
    data() {
      return {
        // 默认当前年份，判断是否开启年份列表，接收年份列表数据
        defaultyear: new Date().getFullYear(),
        isCloseYear: true,
        years: [2017, 2018],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        activemonth: [],
      };
    },
    mounted() {
      console.log('888askdfj klasjdf asdf')
      // 这里要给默认的年份的文章给点亮月份
      this.setActiveYear(this.defaultyear);
    },
    computed: {
      isYearClose() {
        return {
          'year-close': this.isCloseYear,
          'year-open': !this.isCloseYear,
        };
      },
    },
    methods: {
      isActiveMonth(month) {
        console.log('8asdfo alksdfasdfjk ')
        console.log(this.activemonth)
        return this.activemonth.indexOf(String(month)) !== -1;
      },
      handleMouseenter() {
        // 1. 按照数组数据，改变高度
        // 2. 修改元素类，使其可见-如果有year-close全部清除
        const rootMenu = this;
        rootMenu.$refs.yearpicker.style.height = (40 * (this.allyears.length + 1)) + 'px';
        this.isCloseYear = false;
      },
      handleMouseleave() {
        this.isCloseYear = true;
        this.$refs.yearpicker.style.height = '40px';
      },
      setActiveYear(year) {
        this.activemonth = this.allmonth[year];
      },
      test() {
        console.log(this.allyears)
        console.log(this.allmonth)
      }
    },
  };
</script>

<style>
  @import "../assets/css/TimePicker.css";
</style>

