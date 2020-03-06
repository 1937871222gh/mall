<template>
    <div id="detail">
        <detail-nav-bar class="nav-bar" @itemClick="titleClick" ref="nav"/>
        <scroll
                :pullUpLoad="false"
                class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info :param-info="paramInfo" ref="param"/>
        <detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <goods-list :goods="recommends" ref="recommend"/>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"/>
        <back-top @click.native="backTop" v-show="isShowBackTop"/>
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
    import GoodsList from "../../components/content/goods/GoodsList";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "components/common/scroll/Scroll";

    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
    import {itemListenerMixin,backTopMixin} from "common/mixin";
    import {debounce} from "common/utils";
    import {mapActions} from 'vuex'

    export default {
        name: "Detail",
        data(){
            return{
                iid:null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopY: [],
                getThemeTopY: null,
                currentIndex: 0
            }
        },
        mixins: [itemListenerMixin,backTopMixin],
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,

            Scroll
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

            // 3.请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list
            })

            // 4.给getThemeTopY赋值
            this.getThemeTopY = debounce(() => {

                this.themeTopY = []
                this.themeTopY.push(0)
                this.themeTopY.push((this.$refs.param.$el.offsetTop) - 44)
                this.themeTopY.push((this.$refs.comment.$el.offsetTop) - 44)
                this.themeTopY.push((this.$refs.recommend.$el.offsetTop) - 44)
                // console.log(this.themeTopY);
            })
        },
        destroyed(){
            // 取消全局事件的监听,区分home，detail的refresh刷新
            this.$bus.$off('itemImageLoad',this.itemImgListener)
        },
        methods: {
            ...mapActions(['addCart']),
            titleClick(index){
                this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
            },
            imageLoad(){
                this.$refs.scroll.refresh()
                // 调用点击标题滚动到对于内容
                this.getThemeTopY()
            },
            contentScroll(position){
                const positionY = -position.y
                let length =this.themeTopY.length
                for(let i =0; i<length; i++){
                    if(this.currentIndex !== i &&((i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) ||
                        (i === length -1 && positionY >= this.themeTopY[i]))){
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }

                // 3.是否显示回到顶部
                this.listenShowBackTop(position)
            },
            addToCart(){
                // 1.获取购物车需要展示的信息
                const product = {}
                product.image = this.topImages[0]
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;

                // 2.将商品添加到购物车里面
                // this.$store.dispatch('addCart',product).then(res =>{
                //     console.log(res)
                // })
                this.addCart(product).then(res => {
                    // console.log(res)
                })
            }
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px - 57px);
    }
    .nav-bar{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>
