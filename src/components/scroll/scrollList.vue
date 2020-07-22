<template>
  <div class="scroll-list-wrap">
    <ul
      class="scroll-list"
      ref="scrollList"
      @scroll="handleScroll"
      @touchstart="handleStart"
      @touchend="handleEnd">
      <li></li>
      <li></li>
      <li v-for="(item,index) in list" @click.stop="handleSelect(item,index)">{{showText(item)}}{{suffix}}</li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
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
        manualFlag: false,
        index: 0,
        timer: null
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
        this.manualFlag = true;
      },
      handleMove(e) {
        // this.clearMoveBack();
      },
      handleEnd(e) {
        this.manualFlag = false;
        this.debounceScroll();
      },
      moveBack() {
        let scrollList = this.$refs.scrollList;
        let scrollTop = scrollList.scrollTop;
        let height = scrollTop % this.itemHeight | 0;
        if (!height) {
          return this.submitResult();
        }
        if (height > (this.itemHeight >> 1)) {
          scrollList.scrollTop = (scrollTop + 1) | 0;
        } else {
          scrollList.scrollTop = (scrollTop - 1) | 0;
        }
        requestAnimationFrame(this.moveBack);
      },
      moveTo(index) {
        let scrollList = this.$refs.scrollList;
        let scrollTop = scrollList.scrollTop | 0;
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
        requestAnimationFrame(() => this.moveTo(index));
      },
      handleScroll(e) {
        if (this.manualFlag) return;
        this.debounceScroll(e);
      },
      debounceScroll() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.scrollCb();
        }, 80);
      },
      scrollCb() {
        this.moveBack();
      },
      handleSelect(item, index) {
        this.moveTo(index);
      },
      submitResult() {
        // console.log("input");
        let scrollList = this.$refs.scrollList;
        let scrollTop = scrollList.scrollTop;
        let index = scrollTop / this.itemHeight | 0;
        this.$emit("input", this.list[index]);
      },
      setScrollTop() {
        let index = this.list.indexOf(this.value);
        this.$nextTick(() => {
          this.$refs.scrollList.scrollTop = index * this.itemHeight;
        });
      },
    },
    watch: {
      value: "setScrollTop"
    },
    mounted() {
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
    will-change: scroll-position;
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
