<template>
    <div id="list">
      <div v-for="(item, index) in listData" :key="index" class="item">
        <span class="icon">
          <svg :fill="item.iconColor"><use :xlink:href="item.icon"></use></svg>
        </span>
        <div class="info">{{item.info}}</div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "ListView",
    props: {
		  listData: {
		    type: Array,
        default: function () {
          return []
        }
      }
    }
	}
</script>

<style scoped>
    #list{
        background-color: white;
        position: relative;
    }
    .item{
        height: 44px;
        line-height: 44px;
    }
    .info{
        margin-left: 40px;
        border-bottom: 1px solid rgba(100, 100, 100, .1);
    }
    .icon svg{
        height: 18px;
        width: 18px;
    }
    .icon{
        position: absolute;
        left: 8px;
    }
</style>
