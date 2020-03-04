<template>
    <div class="goods">
      <img :src="showImage" alt="" @load="imageLoad" @click="itemClick">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">¥{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
</template>

<script>

    export default {
        name: "GoodsListItem",
        props: {
            goodsItem: {
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            imageLoad(){
                this.$bus.$emit('itemimageLoad')
            },
            itemClick(){
                this.$router.push('/detail/'+this.goodsItem.iid)
            }
        },
        computed:{
            showImage(){
                // 不同接口地址数据格式不同，用逻辑或返回对应格式
                return this.goodsItem.image || this.goodsItem.show.img
            }
        }
    }
</script>

<style scoped>
  .goods {
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }
  .goods img {
    width: 100%;
    height: 100%;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
