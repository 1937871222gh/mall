import {debounce} from './utils'
import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  data: function () {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
      // console.log('调用了');
    },
    listenShowBackTop(position){
      this.isShowBackTop = -(position.y)>1000
    }
  }
}

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted() {
    const newrefresh = debounce( this.$refs.scroll.refresh,100)
    //    监听GoodsListItem中的图片加载完成
    this.itemImgListener = () =>{
      newrefresh()
    }
    this.$bus.$on('itemimageLoad',this.itemImgListener)
  }
}
