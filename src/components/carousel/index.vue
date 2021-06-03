<template>
  <div class="carousel" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd">
    <div class="carousel-content" ref="carousel">
      <slot></slot>
    </div>
    <ul class="indicators" v-if="indicatorType==='point'">
      <li v-for="(item,i) in $slots.default" :class="index===i?'active':''"></li>
    </ul>
    <div class="indicators" v-else>
      <span>{{ index + 1 }}</span>
      <span style="padding: 0 0.02rem">/</span>
      <span>{{ $slots.default && $slots.default.length }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "f-carousel",
  props: {
    autoPlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 400
    },
    delay: {
      type: Number,
      default: 4000
    },
    loop: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    indicatorType: {
      type: String,
      default: "point"  //point number
    },
    initIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      startTranslateX: 0,
      startTime: 0,
      interval: 300,
      tId: 0,
      translateId: 0,
      index: 0,
      movable: true,
      firstChange: true,
    }
  },
  computed: {
    carousel() {
      return this.$refs.carousel;
    },
    items() {
      return this.$slots;
    }
  },
  methods: {
    getItems(index) {
      let items = this.carousel.querySelectorAll(".carousel-item");
      return index === void 0 ? items : items[index];
    },
    getItemWidth(index) {
      return this.getItems(index).offsetWidth;
    },
    getTotalWidth() {
      return Array.prototype.reduce.call(this.getItems(), (total, cur) => {
        return total + cur.offsetWidth;
      }, 0);
    },
    getCumSumWidth() {
      let total = 0;
      let items = this.getItems();
      for (let i = 0; i < this.index; i++) {
        total += items[i].offsetWidth;
      }
      return total;
    },
    handleStart(e) {
      this.stop();
      this.startTranslateX = this.getTranslateX();
      this.setTranslateX(this.startTranslateX);
      this.removeTransition();
      this.startX = e.changedTouches[0].pageX;
      this.startY = e.changedTouches[0].pageY;
      this.startTime = Date.now();
    },
    handleMove(e) {
      if (!this.movable) return;
      let curX = e.changedTouches[0].pageX;
      let curY = e.changedTouches[0].pageY;
      let translateX = curX - this.startX;
      let translateY = curY - this.startY;
      if (this.firstChange && Math.abs(translateY) > Math.abs(translateX)) {
        this.movable = false;
        return;
      }
      this.firstChange = false;
      e.preventDefault();
      let lastIndex = this.getItems().length - 1;
      if (this.loop && lastIndex) {
        let totalWidth = this.getTotalWidth();
        let lastTransformX = totalWidth - this.getItemWidth(lastIndex);
        let curTransformX = -this.getTranslateX();
        let firstItem = this.getItems(0);
        let lastItem = this.getItems(lastIndex);
        if (curX < this.startX) {
          if (this.index !== lastIndex) {
            lastItem.style.left = 0;
          }
          if (this.index >= lastIndex && curTransformX > lastTransformX) {
            firstItem.style.left = totalWidth + "px";
          } else if (this.index === 0 && curTransformX > lastTransformX) {
            firstItem.style.left = 0;
            this.setTranslateX(0, false);
            this.startTranslateX = 0;
          }
        } else if (curX > this.startX) {
          if (this.index !== 0) {
            firstItem.style.left = 0;
          }
          if (this.index <= 0 && curTransformX < 0) {
            lastItem.style.left = -totalWidth + "px";
          } else if (this.index === lastIndex && curTransformX < 0) {
            lastItem.style.left = 0;
            this.setTranslateX(-lastTransformX, false);
            this.startTranslateX = -lastTransformX;
          }
        }
      }
      if ((this.sideSwitch(curX) && !this.loop) || lastIndex === 0) {
        translateX /= 2;
      }
      let curTranslateX = this.startTranslateX + translateX;
      this.setTranslateX(curTranslateX, false);
    },
    handleEnd(e) {
      this.movable = true;
      this.firstChange = true;
      let curX = e.changedTouches[0].pageX;
      let offset = 20;
      let inOffset = curX < this.startX + offset && curX > this.startX - offset;
      let length = this.getItems().length;
      if (Date.now() - this.startTime < this.interval && !inOffset) {
        if ((this.sideSwitch(curX) && !this.loop) || length <= 1) {
          this.moveBack();
        } else {
          if (curX < this.startX) {
            this.next();
          } else {
            this.previous();
          }
        }
      } else {
        let itemWidth = this.getItemWidth(this.index);
        let halfWidth = itemWidth >> 1;
        if (curX - this.startX > halfWidth) {
          this.previous();
        } else if (this.startX - curX > halfWidth) {
          this.next();
        } else {
          this.moveBack();
        }
      }
      this.play();
    },
    getTranslateX() {
      let transform = window.getComputedStyle(this.carousel).transform;
      return +transform.split(",")[4] || 0;
    },
    setTranslateX(translateX, emitChange = true) {
      this.carousel.style.transform = `translateX(${translateX}px)`;
      if (emitChange) {
        setTimeout(() => {
          if (emitChange) this.$emit("change", this.index);
        }, this.duration);
      }
    },
    setTransition() {
      this.carousel.style.transition = `all ${this.duration / 1000}s linear`;
    },
    removeTransition() {
      this.carousel.style.transition = "";
    },
    sideSwitch(curX) {
      let lastIndex = this.getItems().length - 1;
      let isLast = this.index >= lastIndex;
      let isFirst = this.index <= 0;
      let translate = curX - this.startX;
      return ((isFirst && translate > 0) || (isLast && translate < 0));
    },
    moveBack() {
      let translateX = this.getTranslateX();
      let itemWidth = this.getItemWidth(0);
      let num = Math.round(translateX / itemWidth);
      this.setTransition();
      this.setTranslateX(itemWidth * num);
    },
    next() {
      let items = this.getItems();
      let length = items.length;
      if (length <= 1) return;
      let isLast = this.index >= length - 1;
      if (isLast) {
        this.setTransition();
        this.index = 0;
        if (this.loop) {
          let left = +items[length - 1].style.left.replace("px", "");
          let totalWidth = this.getTotalWidth();
          if (!left) {
            let firstItem = items[0];
            firstItem.style.left = totalWidth + "px";
            this.setTranslateX(-totalWidth);
            setTimeout(() => {
              this.removeTransition();
              firstItem.style.left = 0;
              this.setTranslateX(0);
            }, this.duration);
          } else {
            this.setTranslateX(0);
          }
        } else {
          this.setTranslateX(0);
        }
      } else {
        this.index++;
        let translateX = this.getCumSumWidth();
        let totalWidth = this.getTotalWidth();
        this.setTransition();
        this.setTranslateX(-translateX);
      }
    },
    previous() {
      let isFirst = this.index <= 0;
      if (isFirst) {
        this.setTransition();
        let items = this.getItems();
        let lastIndex = items.length - 1;
        let totalWidth = this.getTotalWidth();
        let transformX = totalWidth - this.getItemWidth(lastIndex);
        this.index = lastIndex;
        if (this.loop) {
          let left = +items[0].style.left.replace("px", "");
          if (!left) {
            let lastItem = items[lastIndex];
            lastItem.style.left = -totalWidth + "px";
            this.setTranslateX(this.getItemWidth(0));
          } else {
            this.setTranslateX(-transformX);
          }
        } else {
          this.setTranslateX(-transformX);
        }
      } else {
        this.index--;
        let nextItemWidth = this.getCumSumWidth();
        this.setTransition();
        this.setTranslateX(-nextItemWidth);
      }
    },
    stop() {
      clearInterval(this.tId);
    },
    play() {
      if (this.autoPlay) {
        this.tId = setInterval(this.next, this.delay);
      }
    },
    init() {
      if (this.initIndex) {
        let {offsetWidth} = this.carousel;
        this.setTranslateX(-this.initIndex * offsetWidth);
        this.index = this.initIndex;
      }
    }
  },
  mounted() {
    this.init();
    this.play();
  },
  beforeDestroy() {
    this.stop();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/carousel";
</style>
