<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data(){
            return{
                scroll:null
            }
        },
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                // 设置是否监听滚动
                probeType: this.probeType,
                // 设置是否上拉监听
                pullUpLoad: this.pullUpLoad
            })
            // 监听滚动位置
            if(this.probeType===2||this.probeType===3){
                this.scroll.on('scroll',(position) => {
                    // console.log(position);
                    this.$emit('scroll',position)
                    // 将滚动位置信息用$emit的形式发出去
                })
            }
        //    监听上拉事件
           if(this.pullUpLoad){
               this.scroll.on('pullingUp',() => {
                   // console.log('上拉加载更多');
                   this.$emit('pullingUp')
               })
           }
        },
        methods:{
            scrollTo(x,y,time=500){
                this.scroll&&this.scroll.scrollTo(x,y,time)
                // 先调用refresh，把betterscroll缓存清掉再调用scrollTo就没问题了
                // betterscroll那个滚动高度是keepalive保存着的，不用重新计算，所以先把原来你的位置刷新清掉，再调用scrollto方法
                // 减少错误
            },
            finishPullUp(){
                // 上拉完成调用这个方法才能再次上拉
                this.scroll&&this.scroll.finishPullUp()
            },
            refresh(){
                this.scroll&&this.scroll.refresh()
            },
            getScrollY(){
                return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>

</style>
