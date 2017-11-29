<template>
  <div id="app" ref='self'>
    <sidebar ref='sidebar'></sidebar>
    <add ref='add' v-on:refresh='refresh'></add>
    <div class="header">
      <i class="icon icon-list" @click='showSideBar()' v-show='this.$store.state.showSideBarIcon'>&#xe602;</i>
      <p>{{this.$store.state.currTile}}</p>
      <i class="icon icon-add" @click='showAdd()' v-show='this.$store.state.showAddIcon'>&#xe625;</i>
    </div>
    <div class="menu_bar">
      <i class="icon icon-menu icon-calendar" @click="goPage('/')">&#xe659;</i>
      <i class="icon icon-menu icon-doc" @click="goPage('/historytoday')">&#xe653;</i>
      <i class="icon icon-menu icon-rate" @click="goPage('/compute')">&#xe60b;</i>
      <i class="icon icon-menu icon-my" @click="goPage('/my')">&#xe607;</i>
      <i class="icon icon-menu icon-more" @click="goPage('/more')">&#xe61b;</i>
      <span class="hengxian" ref='hengxian'></span>
    </div>
    <router-view ref='home'></router-view>
  </div>
</template>

<script>
import Sidebar from './components/sideBar'
import Add from './components/add'
export default {
  components:{
    Sidebar,Add
  },
  methods:{
    refresh:function(){
      this.$refs.home.refresh();
    },
    showAdd:function(){
        this.$refs.add.show();
    },
    showSideBar:function(){
      this.$refs.sidebar.show();
    },
    initHengxian:function(){
      var width = window.screen.width;
      this.$refs.hengxian.style.width = (width/5) + 'px';
    },
    goPage:function(path){
      //更改横线的位置
      var width = (window.screen.width)/5;
      var index = this.getIndexByPath(path);
    
      this.$store.commit('changeCurrPage',path);
      
      this.$refs.hengxian.style.left = width*index + 'px';
      this.$router.push({path:path});
      this.changeIconClass(index);

      //更改header
      this.isShowTileIcons(index);
      this.changeTitle(path);
    },
    getIndexByPath:function(path){
        var index = 0;
        switch(path){
          case '/':
            index = 0;
            break;
          case '/historytoday':
            index = 1;
            break;
          case '/compute':
            index = 2;
            break;
          case '/my':
            index = 3;
            break;
          case '/more':
            index = 4;
            break;
        }
        return index;
    },
    changeIconClass:function(index){
      var icons = document.getElementsByClassName('icon-menu');
      for(let i = 0; i< icons.length;i++){
        icons[i].style.color = "#ccc";
      }
      icons[index].style.color = '#1E90FF';
    },
    isShowTileIcons:function(index){
      if(index > 0){
        //不显示sidebar和add
        this.$store.commit('toggleIcons',false);
      }else{
        //显示sidebar和bar
        this.$store.commit('toggleIcons',true);
      }
    },
    changeTitle:function(path){
        switch(path){
          case '/':
            this.$store.commit("changeTitle",'倒数日 · 全部')
            break;
          case '/historytoday':
            this.$store.commit("changeTitle",'历史上的今天')
            break;
          case '/compute':
            this.$store.commit("changeTitle",'日期计算器')
            break;
          case '/my':
            this.$store.commit("changeTitle",'登录')
            break;
          case '/more':
            this.$store.commit("changeTitle",'更多')
            break;
        }
    }
  },
  mounted(){
    var _this = this;
    _this.initHengxian();
    window.onresize = function(){
      _this.initHengxian();
    }
    this.changeIconClass(this.getIndexByPath(this.$route.path));
    this.$store.commit('changeCurrPage',this.$route.path);
    var width = (window.screen.width)/5;
    this.$refs.hengxian.style.left = width*this.getIndexByPath(this.$route.path) + 'px';
    //window.localStorage.clear();
  },
  created(){
    //初始化header
    var path = this.$route.path
    var index = this.getIndexByPath(path);
    this.isShowTileIcons(index);
    //控制标题的显示
    this.changeTitle(path);
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
    position: relative;
  }
  .menu_bar i:hover{
    color: #1E90FF;
  }
  .hengxian{
    display: block;
    position: absolute;
    height: 2px;
    background: #1E90FF;
    bottom: -2px;
    left: 0;
    transition: all 0.2s ease;
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
  .header p{
    font-weight: bold;
    font-size: 19px;
  }
</style>
