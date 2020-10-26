/**
*
* @author zzhijie
* @date 2020-10-23
*/

<template>
  <div class="img-preview" v-if="showFlag" @click="showFlag=false">
    <f-carousel :auto-play="false" indicator-type="number" :init-index="initIndex">
      <f-carousel-item v-for="(item,index) in urlList" :key="index">
        <img class="item" :src="item"/>
      </f-carousel-item>
    </f-carousel>
  </div>
</template>

<script>
import FCarousel from "../carousel";
import FCarouselItem from "../carousel/carousel-item";

export default {
  name: "f-img-preview",
  props: {
    urlList: {
      type: Array
    },
    initIndex: {
      type: Number
    }
  },
  components: {
    FCarousel,
    FCarouselItem
  },
  data() {
    return {
      showFlag: false,
    }
  },
  methods: {
    init({urlList, initIndex}) {
      this.urlList = urlList;
      this.initIndex = initIndex;
      this.showFlag = true;
    }
  },
  mounted() {
    // document.body.appendChild(this.$el);
  },
  beforeDestroy() {
    // document.body.removeChild(this.$el);
  }
}
</script>

<style lang="scss" scoped>
.img-preview {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 9999;

  /deep/ .carousel {
    height: 100%;

    .carousel-content {
      height: 100%;
    }

    .carousel-item {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .indicators {
      color: #fff;
    }
  }

  .item {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
