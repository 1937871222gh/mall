<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
    <icon-svg></icon-svg>

  </div>
</template>


<script>
  import MainTabBar from "./components/content/mainTabbar/MainTabBar";
  import Icon from "./components/content/Icon/Icon";
  import IconSvg from "./components/content/Icon/svg";
  export default {
    name: "App",
    components: {
      MainTabBar,
      Icon,
      IconSvg
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
