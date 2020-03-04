<template>
    <swiper>
        <swiper-item class="detail-swiper" v-for="(item,index) in topImages" v-if="topImages.length" :key="index">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper'
    export default {
        name: "DetailSwiper",
        props:{
            topImages: {
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            Swiper,
            SwiperItem
        }
    }
</script>

<style scoped>
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>
