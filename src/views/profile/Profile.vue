<template>
    <div id="profile">
        <nav-bar class="nav-bar"><div slot="center">mall商场</div></nav-bar>
<!--        1.头像部分-->
        <user-info></user-info>
<!--        2base-info-->
        <section class="base-info">
            <div class="item" v-for="(item ,index) in baseInfos" :key="index">
                <span class="balance">{{item.balance}}</span><span>{{item.company}}</span>
                <div class="account-info">{{item.info}}</div>
            </div>
        </section>

        <!--3.封装成一个整体-->
        <list-view :list-data="orderList" class="order-list"></list-view>
        <list-view :list-data="serviceList" class="service-list"></list-view>

    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import UserInfo from "./childComps/UserInfo";
    import ListView from "./childComps/ListView";
    export default {
        name: "Profile",
        components: {
            NavBar,
            UserInfo,
            ListView
        },
        data(){
            return{
                baseInfos:[
                    {balance: '0.00' , info: '我的余额', company:'元'},
                    {balance: 0 , info: '我的优惠', company:'个'},
                    {balance: 0 , info: '我的积分', company:'分'}
                ],
                orderList: [
                    {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
                    {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
                    {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
                ],
                serviceList: [
                    {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
                    {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
                ]
            }
        }

    }
</script>

<style scoped>
    #profile{
        height: 100vh;
        background-color: #f2f2f2;
    }
    .nav-bar{
        color: white;
        background-color: var(--color-tint);
    }
    .base-info{
        display: flex;
        justify-content: space-between;
        text-align: center;


    }
    .base-info .item{
        padding: 18px;
        width: 100%;
        background-color: #fff;
        margin-right: 1px;
        text-align: center;
        color: #666;
        font-size: 13px;
        padding: 18px;
    }
    .item .balance{
        font-size: 24px;
        font-weight: 700;
        color: #ff5f3e
    }
    .order-list, .service-list {
        margin-top: 12px;
    }
</style>
