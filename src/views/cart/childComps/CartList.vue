<template>
    <div class="cart-list">
      <Scroll class="content" :pullUpLoad="true" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList"  :key="index" :item-info="item" />
      </Scroll>
      <cart-bottom-bar/>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Scroll from "components/common/scroll/Scroll";
  import CartBottomBar from "./CartBottomBar";

  import CartListItem from "./CartListItem";

    export default {
        name: "CartList",
        components: {
            Scroll,
            CartListItem,
            CartBottomBar
        },
        computed: {
            ...mapGetters(['cartList'])
        },
        activated() {
            // 重新计算可滚动高度
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
.content{
  height: 100%;
  /*很关键不然就看不到底部导航栏了*/
  overflow: hidden;
}
</style>
