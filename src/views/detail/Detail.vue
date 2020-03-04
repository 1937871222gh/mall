<template>
    <div id="detail">
        <detail-nav-bar/>
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo"/>
        <detail-param-info :param-info="paramInfo"/>
        <detail-comment-info :comment-info="commentInfo"/>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";

    import {getDetail,Goods,Shop,GoodsParam} from "network/detail";

    export default {
        name: "Detail",
        data(){
            return{
                iid:null,
                topImages: [],
                goods:{},
                shop: {},
                detailInfo:{},
                paramInfo: {},
                commentInfo:{},
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo
        },
        created() {
            // 1.保存传入的iid
            this.iid = this.$route.params.iid

            //2.根据iid请求数据
            getDetail(this.iid).then(res => {
                const data =res.result
                // 1.获取顶部的图片轮播数据
                this.topImages =data.itemInfo.topImages

                //    2.获取商品信息,把数据整合为一个对象
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

                //   3.创建店铺信息的对象
                this.shop =new Shop(data.shopInfo)

                // 4.获取商品详情信息
                this.detailInfo = data.detailInfo

                // 5.保存参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

                // 6.保存评论信息
                if (data.rate.list) {
                    this.commentInfo = data.rate.list[0];
                }
            })
        }
    }
</script>

<style scoped>

</style>
