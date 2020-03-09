<template>
    <div class="tab-content">
        <van-sidebar v-for="(item,index) in categories"
                     :key="index"
                     active-key="activeKey"
                     @change="onChange(index)"
                     class="custom-class"
                     v-if="categories.length">
            <van-sidebar-item :title="item.title" :class="{actived : activeKey === index}"/>
        </van-sidebar>
    </div>
</template>

<script>
    import { Sidebar,SidebarItem} from "vant";
    export default {
        name: "TabContent",
        components: {
            [Sidebar.name]: Sidebar,
            [SidebarItem.name]: SidebarItem
        },
        data(){
            return{
                activeKey: 0
            }
        },
        props: {
            categories: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        methods: {
            onChange(index){
                this.activeKey = index
                this.$emit('tabClick',this.categories[index].maitKey)
            }
        }
    }
</script>

<style scoped>
    .custom-class{
        width: 100px;
        text-align: center;
        background-color: #f6f6f6;
    }
    .actived{
        font-weight: 700;
        color: var(--color-high-text);
        background-color: #fff;
        border-left: 3px solid var(--color-high-text);
    }
    .van-sidebar-item{
        padding: 13px 12px 13px 8px;

    }
</style>
