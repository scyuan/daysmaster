<template>
  <div id="app" ref='self'>
    <sidebar ref='sidebar'></sidebar>
    <div class="header">
      <i class="icon icon-list" @click='showSideBar()'>&#xe602;</i>
      <p>倒数日 · 全部</p>
      <i class="icon icon-add">&#xe625;</i>
    </div>
    <div class="menu_bar">
      <i class="icon icon-menu icon-calendar">&#xe659;</i>
      <i class="icon icon-menu icon-doc">&#xe653;</i>
      <i class="icon icon-menu icon-rate">&#xe60b;</i>
      <i class="icon icon-menu icon-my">&#xe607;</i>
      <i class="icon icon-menu icon-more">&#xe61b;</i>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from './components/sideBar'
export default {
  methods:{
    showSideBar:function(){
      this.$refs.sidebar.show();
    },
  },
  components:{
    Sidebar
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  @font-face {
  font-family: 'iconfont';  /* project id 478040 */
  src: url('//at.alicdn.com/t/font_478040_lrnvxzrei8eka9k9.eot');
  src: url('//at.alicdn.com/t/font_478040_lrnvxzrei8eka9k9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_478040_lrnvxzrei8eka9k9.woff') format('woff'),
  url('//at.alicdn.com/t/font_478040_lrnvxzrei8eka9k9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_478040_lrnvxzrei8eka9k9.svg#iconfont') format('svg');
}
  *,p,ul,li,div{
    margin: 0;
  }
  .icon{
    font-family: 'iconfont';
    display: inline-block;
    font-style: normal;
  }
  .icon-list{
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0;
  }
  .icon-add{
    position: absolute;
    width: 50px;
    height: 50px;
    right: 0;
    top: 0;
  }
  .header{
    height: 50px;
    width: 100%;
    color: #fff;
    background:#1E90FF;
    position: relative;
    text-align: center;
    line-height: 50px;
  }
  .menu_bar{
    height: 40px;
    box-sizing: border-box;
    border-bottom: 2px solid #efefef;
    display: flex;
  }
  .icon-menu{
    display: inline-block;
    width: 38px;
    height: 38px;
    flex: 1;
    color: #ccc;
    font-size: 20px;
    text-align: center;
    line-height: 38px;
  }
  .icon-calendar{
    font-size:25px;
  }
  .icon-rate{
    font-size: 22px;
  }
  .icon-doc{
    line-height: 40px;
  }
</style>
