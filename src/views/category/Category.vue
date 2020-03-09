<template>
    <div id="category">
        <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
        <scroll class="content">
            <div class="info">
                <tab-content :categories="categories" @tabClick="tabClick"/>
                <category-info :category-info="categoryInfo"/>
            </div>
        </scroll>

    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import TabContent from "./childComps/TabContent";
    import CategoryInfo from "./childComps/CategoryInfo";

    import Scroll from "components/common/scroll/Scroll";

    import {getCategory,getSubcategory,getCategoryDetail} from "network/category";


    export default {
        name: "Category",
        components: {
            TabContent,
            NavBar,
            CategoryInfo,

            Scroll
        },
        data(){
            return{
                categories: [],
                currentKey: 3627,
                categoryInfo: []
            }
        },
        created() {
            // 1.请求tabcontent的数据
            getCategory().then(res => {
                this.categories = res.data.category.list
            })
        },
        mounted(){
            // 2.根据tabcontent传过来的数据，请求info的数据
            getSubcategory(this.currentKey).then( res => {
                this.categoryInfo =res.data.list
                console.log(this.categoryInfo);
            })
        },
        methods: {
            tabClick(value){
                this.currentKey = value
                getSubcategory(this.currentKey).then( res => {
                    this.categoryInfo =res.data.list
                })
            }
        }
    }
</script>

<style scoped>
    #category{
        height: 100vh;
    }
    .nav-bar{
        background-color: var(--color-tint);
        font-weight: 700;
        color: white;
    }
    .content{
        height: calc(100% - 44px - 47px);
    }
    .info{
        display: flex;
    }
</style>
