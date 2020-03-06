<template>
  <div id="cart">
    <!--      导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
<!--    商品的展示-->
    <cart-list/>
<!--    底部汇总-->
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./childComps/CartList";

  import {mapGetters} from 'vuex'
    export default {
        name: "Cart",
        components: {
            NavBar,

            CartList
        },
        computed: {
            // 数组写法
            ...mapGetters(['cartLength'])
            // 对象写法
            // ...mapGetters({
            //     length : 'cartLength',
            //     list : 'cartList'
            // })
        }

    }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
  #cart{
    height: 100vh;
  }
</style>
