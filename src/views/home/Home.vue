<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
        <tab-control  :titles="['流行','新款','精选']"
                      @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
        <scroll
                :probeType="3"
                :pullUpLoad="true"
                class="content"
                ref="scroll"
                @scroll="contentScroll"
                @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control
                :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl2"/>
        <goods-list :goods="showGoods"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import GoodsListItem from "components/content/goods/GoodsListItem";

    import Scroll from "components/common/scroll/Scroll";
    import BackTop from "components/content/backTop/BackTop";

    import {getHomeMultidata,getHomeGoods} from "network/home";
    import {debounce} from "../../common/utils";


    export default {
        name: "Home",
        data(){
            return{
                banners:[],
                recommends:[],
                goods: {
                    'pop':{page: 0, list: []},
                    'new':{page: 0, list: []},
                    'sell':{page: 0, list: []}
                },
                currentType:'pop',
                isShowBackTop:'true',
                itemImgListener:null,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0
            }
        },
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            GoodsListItem,

            Scroll,
            BackTop
        },
        created() {
            // 1.请求多个数据
            this.getHomeMultidata()

            //    2.请求商品数据
            this.getHomeGoods('pop')

            this.getHomeGoods('new')

            this.getHomeGoods('sell')

        },
        mounted(){
            const newrefresh = debounce( this.$refs.scroll.refresh,100)
            //    监听GoodsListItem中的图片加载完成

            this.itemImgListener = () =>{
                newrefresh()
            }
            this.$bus.$on('itemimageLoad',this.itemImgListener)
        },
        activated(){
            this.$refs.scroll.refresh()
            // 去到上次活跃的saveY值那里
            this.$refs.scroll.scrollTo(0,this.saveY,0)
        },
        deactivated(){
            // 1.保存Y值
            this.saveY =this.$refs.scroll.getScrollY()

            // 2.取消全局事件的监听
            this.$bus.$off('itemImageLoad',this.itemImgListener)
        },
        computed:{
            showGoods(){
                return this.goods && this.goods[this.currentType].list
            }
        },
        methods: {

            // 事件监听相关
            tabClick(index){
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
                //    统一两个tabControl点击的index
            },
            backClick(){
                this.$refs.scroll.scrollTo(0,0,500)
            },
            contentScroll(position){
                this.isShowBackTop = -(position.y)>1000
                // 直接用表达式决定布尔值

                this.isTabFixed =  -(position.y)>this.tabOffsetTop
                // 决定是否吸顶
            },
            loadMore(){
                // console.log('上拉加载更多');
                // 加载记录的currentType
                this.getHomeGoods(this.currentType)
            },
            swiperImageLoad(){
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },
            // 事件监听相关

            // 网络请求相关
            getHomeMultidata(){
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends =res.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                // 值得思考
                // 只能goods[type]这样调用，不能goods.type，因为传过来的是'type'
                const page =this.goods[type].page + 1
                getHomeGoods(type,page).then(res => {
                    // console.log(res);
                    this.goods[type].list.push(...res.data.list)
                    //    ES6语法将请求数据list push到data的对应goods里面
                    this.goods[type].page += 1
                    // 上拉完成调用这个方法才能再次上拉
                    this.$refs.scroll.finishPullUp()

                    // 重新计算可滚动高度
                    this.$refs.scroll.refresh()
                })
            }
            // 网络请求相关
        }
    }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
  }
  .content{
      position: absolute;
      top: 44px;
      bottom: 49px;
      right: 0;
      left: 0;
      overflow: hidden;
  }
  .tab-control{
      background-color: white;
      position: relative;
      z-index: 9;
  }
</style>
