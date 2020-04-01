<template>
  <div class="carousel" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd">
    <div class="carousel-content" ref="carousel">
      <slot></slot>
    </div>
    <ul class="indicators" v-if="indicatorType==='point'">
      <li v-for="(item,i) in $slots.default" :class="index===i?'active':''"></li>
    </ul>
    <div class="indicators" v-else>
      <span>{{index+1}}</span>
      <span style="padding: 0 0.02rem">/</span>
      <span>{{$slots.default&&$slots.default.length}}</span>
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
        default: 300
      },
      delay: {
        type: Number,
        default: 3000
      },
      loop: {
        type: Boolean,
        default: false
      },
      showIndicators: {
        type: Boolean,
        default: true
      },
      indicatorType: {
        type: String,
        default: "point"  //point number
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
        resetItem: false,
        isMoving: false,
        movable: true,
        firstChange: true,
      }
    },
    computed: {
      carousel() {
        return this.$refs.carousel;
      },
    },
    methods: {
      getItems() {
        return this.carousel.querySelectorAll(".carousel-item");
      },
      getItemWidth(index) {
        return this.getItems()[index].offsetWidth;
      },
      getTotalWidth() {
        return Array.prototype.reduce.call(this.getItems(), (total, cur) => {
          return total + cur.offsetWidth;
        }, 0);
      },
      handleStart(e) {
        // if (this.isMoving) return;
        this.clearMove();
        this.removeTransition();
        this.startX = e.changedTouches[0].pageX;
        this.startY = e.changedTouches[0].pageY;
        this.startTranslateX = this.getTranslateX();
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
        if (!this.resetItem && this.loop) {
          this.resetItem = true;
          let totalWidth = this.getTotalWidth();
          if (this.index >= lastIndex && curX < this.startX) {
            let firstItem = this.getItems()[0];
            firstItem.style.left = totalWidth + "px";
            // this.setNextItem(1);
          } else if (this.index <= 0 && curX > this.startX) {
            let lastItem = this.getItems()[lastIndex];
            lastItem.style.left = -totalWidth + "px";
            // this.setPrevItem(lastIndex-1);
          }
        }
        if (this.sideSwitch(curX) && !this.loop) {
          translateX /= 2;
        }
        let curTranslateX = this.startTranslateX + translateX;
        this.setTranslateX(curTranslateX, null, false);
      },
      handleEnd(e) {
        // if(this.isMoving) return;
        this.movable = true;
        this.firstChange = true;
        let curX = e.changedTouches[0].pageX;
        if (curX === this.startX) return;
        // this.isMoving=true;
        if (Date.now() - this.startTime < this.interval) {
          if (this.sideSwitch(curX) && !this.loop) {
            this.moveBack();
          } else {
            if (curX < this.startX) {
              this.next();
            } else {
              this.previous();
            }
          }
        } else {
          this.moveBack();
        }
        this.move();
      },
      setNextItem(index) {
        let totalWidth = this.getTotalWidth();
        let items = this.getItems();
        for (let i = 0; i <= index; i++) {
          if (!items[i]) break;
          items[i].style.left = totalWidth + "px";
        }
      },
      setPrevItem(index) {
        let totalWidth = this.getTotalWidth();
        let items = this.getItems();
        let len = items.length;
        for (let i = len - 1; i >= index; i--) {
          if (!items[i]) break;
          items[i].style.left = -(totalWidth) + "px";
        }
      },
      clearItemStyle() {
        let items = this.getItems();
        let len = items.length;
        for (let i = 0; i < len; i++) {
          items[i].style.left = 0;
        }
      },
      getTranslateX() {
        return +this.carousel.style.transform.replace(/[^0-9\-.]/ig, "") || 0;
      },
      setTranslateX(translateX, cb, emitChange = true) {
        this.carousel.style.transform = `translateX(${translateX}px)`;
        setTimeout(() => {
          if (cb) cb();
          if (emitChange) this.$emit("change", this.index);
          this.resetItem = false;
        }, this.duration);
      },
      setTransition() {
        this.carousel.style.transition = `all ${this.duration / 1000}s`;
      },
      removeTransition() {
        this.carousel.style.transition = "";
      },
      findCurPosition(index = 0, addWidth = 0) {
        let itemWidth = this.getItemWidth(index);
        let translateX = -this.getTranslateX();
        switch (true) {
          case translateX < 0:
          case index >= this.getItems().length - 1:
            return {addWidth, index};
          case translateX > addWidth + itemWidth:
            return this.findCurPosition(++index, addWidth + itemWidth);
          default:
            if (translateX > addWidth + (itemWidth >> 1)) {
              addWidth += itemWidth;
              index++;
              return {addWidth, index};
            } else {
              return {addWidth, index};
            }
        }
      },
      sideSwitch(curX) {
        let lastIndex = this.getItems().length - 1;
        let isLast = this.index >= lastIndex;
        let isFirst = this.index <= 0;
        let translate = curX - this.startX;
        return ((isFirst && translate > 0) || (isLast && translate < 0));
      },
      canToLast() {
        let {addWidth, index} = this.findCurPosition();
        let translateX = this.getTranslateX();
        let firstItemWidth = this.getItemWidth(0);
        return this.index === index && index === 0 && translateX > (firstItemWidth >> 1);
      },
      canToFirst() {
        let {addWidth, index} = this.findCurPosition();
        let lastIndex = this.getItems().length - 1;
        let translateX = this.getTranslateX();
        let lastItemWidth = this.getItemWidth(lastIndex);
        let totalWidth = this.getTotalWidth();
        return this.index === index && index === lastIndex && -translateX > (totalWidth - (lastItemWidth >> 1));
      },
      moveBack() {
        let {addWidth, index} = this.findCurPosition();
        if (this.canToLast() && this.loop) {
          this.previous();
        } else if (this.canToFirst() && this.loop) {
          this.next();
        } else {
          this.index = index;
          this.setTransition();
          this.setTranslateX(-addWidth);
        }
      },
      next() {
        let len = this.getItems().length;
        if (len <= 1) return;
        let {addWidth, index} = this.findCurPosition();
        let isLast = index >= len - 1;
        if (isLast) {
          this.setTransition();
          this.index = 0;
          if (this.loop) {
            let totalWidth = this.getTotalWidth();
            let firstItem = this.getItems()[0];
            firstItem.style.left = totalWidth + "px";
            // this.setNextItem(1);
            this.setTranslateX(-totalWidth, () => {
              this.removeTransition();
              firstItem.style.left = 0;
              // this.clearItemStyle();
              this.setTranslateX(0, null, false);
            });
          } else {
            this.setTranslateX(0);
          }
        } else {
          this.index = index + 1;
          let nextItemWidth = this.getItemWidth(this.index);
          addWidth += nextItemWidth;
          this.setTransition();
          this.setTranslateX(-addWidth);
        }
      },
      previous() {
        let {addWidth, index} = this.findCurPosition();
        let isFirst = index <= 0;
        if (isFirst) {
          this.setTransition();
          let items = this.getItems();
          let lastIndex = items.length - 1;
          let curWidth = this.getTotalWidth() - this.getItemWidth(lastIndex);
          this.index = lastIndex;
          if (this.loop) {
            let totalWidth = this.getTotalWidth();
            let lastItem = items[lastIndex];
            let lastItemWidth = lastItem.offsetWidth;
            lastItem.style.left = -totalWidth + "px";
            // this.setPrevItem(this.index-1);
            this.setTranslateX(lastItemWidth, () => {
              this.removeTransition();
              lastItem.style.left = 0;
              // this.clearItemStyle();
              this.setTranslateX(-curWidth, null, false);
            });
          } else {
            this.setTranslateX(-curWidth);
          }
        } else {
          this.index = index - 1;
          let nextItemWidth = this.getItemWidth(this.index);
          addWidth -= nextItemWidth;
          this.setTransition();
          this.setTranslateX(-addWidth);
        }
      },
      clearMove() {
        clearInterval(this.tId);
      },
      move() {
        if (this.autoPlay) {
          this.tId = setInterval(() => this.next(), this.delay);
        }
      }
    },
    mounted() {
      this.move();
    },
    beforeDestroy() {
      this.clearMove();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/carousel";
</style>
