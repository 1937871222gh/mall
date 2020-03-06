<template>
    <div class="cart-bottom-bar">
      <div class="button-content">
        <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
        <span>全选</span>
      </div>
      <div class="price">
        合计：{{totalPrice}}
      </div>
      <div class="calculate">
        去结算：({{checkLength}})
      </div>
    </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
        components:{
            CheckButton
        },
        computed: {
            ...mapGetters(['cartList']),
            totalPrice(){
                return this.cartList.filter(item => item.checked).reduce((prev,item) =>{
                    return prev + item.price * item.count
                },0).toFixed(2)
            },
            checkLength(){
                return this.cartList.filter(item => item.checked).length
            },
            isSelectAll(){
                if(this.cartList.length === 0){
                    return false
                }else{
                    return !(this.cartList.find(item => !item.checked))
                }
            }
        },
        methods: {
            checkClick(){
                if(this.isSelectAll){
                    this.cartList.forEach(item => item.checked = false)
                }else{
                    this.cartList.forEach(item => item.checked = true)
                }
                // this.cartList.forEach(item => item.cheked = !this.isSelectAll)
            }
        }
    }
</script>

<style scoped>
  .cart-bottom-bar{
    border-top: 1px solid #ccc;
    /*background-color: #cccccc;*/
    height: 40px;
    display: flex;
  }
  .button-content{
    display: flex;
    align-items: center;
    width: 100px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    margin-right: 10px;
    margin-left: 2px;
  }
  .price{
    flex: 1;
    line-height: 40px;
  }
  .calculate{
    text-align: center;
    font-size: 14px;
    width: 90px;
    color: white;
    line-height: 40px;
    background-color: red;
  }
</style>
