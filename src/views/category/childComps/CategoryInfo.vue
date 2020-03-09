<template>
    <div class="category-info">
        <van-grid column-num="3">
            <van-grid-item use-slot v-for="(item,index) in categoryInfo" :key="index">
                <van-image
                        width="50"
                        height="50"
                        :src="item.image"
                />
                <span>{{item.title}}</span>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    import {Grid,GridItem,Image} from "vant"
    export default {
        name: "CategoryInfo",
        props: {
            categoryInfo:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components: {
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Image.name]: Image
        }
    }
</script>

<style scoped>
    span{
        margin-top: 4px;
        text-align: center;
        font-size: 12px;
    }
</style>
