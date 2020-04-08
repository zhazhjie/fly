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
  let timer = null;
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
        stopFlag: false,
        autoFlag: false,
        index: 0
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
        this.stopFlag = true;
        this.autoFlag = false;
      },
      handleMove(e) {
        // this.clearMoveBack();
      },
      handleEnd(e) {
        this.stopFlag = false;
        this.scrollCb({target: this.$refs.scrollList});
      },
      moveBack(callback) {
        if (this.stopFlag) return;
        this.autoFlag = true;
        let scrollList = this.$refs.scrollList;
        let scrollTop = scrollList.scrollTop;
        let height = scrollTop % this.itemHeight | 0;
        if (!height) {
          if (callback) callback();
          this.autoFlag = false;
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
        this.autoFlag = true;
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
          if (callback) callback();
          this.autoFlag = false;
          return;
        }
        requestAnimationFrame(() => this.moveTo(index, callback));
      },
      handleScroll(e) {
        if (this.autoFlag) return;
        // this.debounceScroll(e);
        this.stopFlag = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.stopFlag = false;
          this.scrollCb(e);
        }, 80);
      },
      scrollCb(e) {
        if (!this.autoFlag) {
          this.moveBack(() => {
            let scrollTop = e.target.scrollTop;
            let index = scrollTop / this.itemHeight | 0;
            this.$emit("input", this.list[index]);
          });
        }
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
