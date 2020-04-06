<template>
  <div class="scroll-list-wrap">
    <ul
      class="scroll-list"
      ref="scrollList"
      @scroll="handleScroll"
      @touchstart="handleStart"
      @touchend="handleEnd">
      <li v-for="item in 2"></li>
      <li v-for="(item,index) in list" @click.stop="handleSelect(item,index)">{{showText(item)}}{{suffix}}</li>
      <li v-for="item in 2"></li>
    </ul>
  </div>
</template>

<script>
  import {debounce} from "js-utils";

  export default {
    name: "f-scroll-list",
    props: {
      list: {
        type: [Array, Number]
      },
      suffix: {
        type: String,
        default: ""
      },
      value: {
        type: [Number, String, Object],
      },
      format: {
        type: Boolean,
        default: true,
      },
      defaultProps: {
        type: Object,
        default: () => {
          return {value: 'value', text: 'text'}
        }
      },
    },
    data() {
      return {
        itemHeight: 40,
        itemNum: 5,
        stepHeight: 5,
        stop: false,
      }
    },
    methods: {
      formatNumber(val) {
        if (!this.format) return val;
        let isNumber = !isNaN(val);
        if (isNumber) {
          val += "";
          return val[1] ? val : "0" + val;
        } else {
          return val;
        }
      },
      showText(item) {
        if (Object.prototype.toString.call(item) === "[object Object]") {
          return this.formatNumber(item[this.defaultProps.text]);
        } else {
          return this.formatNumber(item);
        }
      },
      handleStart(e) {
        this.stop = true;
      },
      handleMove(e) {
        // this.clearMoveBack();
      },
      handleEnd(e) {
        this.stop = false;
        this.moveBack();
      },
      moveBack(callback) {
        if (this.stop) return;
        let scrollList = this.$refs.scrollList;
        let scrollTop = scrollList.scrollTop;
        let height = scrollTop % this.itemHeight;
        if (!height) {
          if (callback) callback();
          return;
        }
        if (height > (this.itemHeight >> 1)) {
          scrollList.scrollTop = (scrollTop + 1) | 0;
        } else {
          scrollList.scrollTop = (scrollTop - 1) | 0;
        }
        requestAnimationFrame(() => this.moveBack(callback));
      },
      moveTo(index, callback) {
        let scrollList = this.$refs.scrollList;
        let scrollTop = scrollList.scrollTop;
        let targetHeight = this.itemHeight * index;
        let surplusHeight = Math.abs(targetHeight - scrollTop);
        let height = this.stepHeight < surplusHeight ? this.stepHeight : surplusHeight;
        if (scrollTop < targetHeight) {
          scrollList.scrollTop = (scrollTop + height) | 0;
        } else if (scrollTop > targetHeight) {
          scrollList.scrollTop = (scrollTop - height) | 0;
        } else {
          return;
        }
        requestAnimationFrame(() => this.moveTo(index, callback));
      },
      handleScroll(e) {

      },
      scrollCb(e) {
        this.moveBack(() => {
          let scrollTop = e.target.scrollTop;
          let index = scrollTop / this.itemHeight;
          this.$emit("input", this.list[index]);
        });
      },
      handleSelect(item, index) {
        this.moveTo(index, () => {
          this.$emit("input", item);
        });
      },
      setScrollTop() {
        let index = this.list.indexOf(this.value);
        this.$nextTick(() => {
          this.$refs.scrollList.scrollTop = index * this.itemHeight;
        });
      }
    },
    watch: {
      value: "setScrollTop"
    },
    created() {
      this.handleScroll = debounce(this.scrollCb, 50);
    },
    mounted() {
      // this.itemHeight=this.$refs.scrollList.offsetHeight/this.itemNum;
      this.setScrollTop();
    }
  }
</script>

<style scoped>
  .scroll-list-wrap {
    flex: 1;
    height: 200px;
    overflow: hidden;
  }

  .scroll-list {
    width: calc(100% + 20px);
    height: 100%;
    overflow: auto;
    padding-right: 15px;
    -webkit-overflow-scrolling: touch;
  }

  .scroll-list li {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 5px;
    user-select: none;
  }
</style>
