<template>
  <swiper v-if="banners.length">
        <!-- 加v-if的目的是为了banners全部加载出来再渲染   -->
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper'
    export default {
        name: "homeSwiper",
        components: {
            Swiper,
            SwiperItem
        },
        props: {
            banners: {
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods: {
            imageLoad() {
                this.$emit('swiperImageLoad')
            }
        }
    }
</script>

<style scoped>

</style>
