/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-04-20 11:14:13
* @version: 1.0
*/

<template>
  <div class="list" :class="bodyScroll?'':'h100'" @touchstart='handleStart' @touchmove='handleMove' @touchend='handleEnd'>
    <transition name='fade'>
      <div class="success-text" v-show='successFlag'>刷新成功</div>
    </transition>
    <div class="spin-box" ref='spinBox' :class='zoomIn?"zoom-in":""'>
      <svg viewBox="25 25 50 50" class="spin" ref="spin">
        <circle ref="circle" cx="50" cy="50" r="20" fill="none" class="path" style='stroke-dasharray:1,200;'></circle>
      </svg>
    </div>
    <div :class="bodyScroll?'':'scroll-box'" ref='scrollBox' @scroll="handleScroll">
      <slot name='header'/>
      <slot/>
      <slot name="empty">
        <f-empty v-if='!dataLength&&!loading'>{{emptyText}}</f-empty>
      </slot>
      <div class="load-more">
        <f-loading-2 v-show='!isRefresh&&loading&&!!dataLength'/>
        <div class="load-end" v-show='eof&&dataLength'>-END-</div>
      </div>
      <slot name='footer'/>
    </div>
    <transition name='fade'>
      <i class="to-top" @click='toTop' v-show='toTopFlag'>&#xe67f;</i>
    </transition>
    <transition name='fade'>
      <f-loading-1 class='loading' :show-flag='loading&&!isRefresh&&!dataLength'/>
    </transition>
  </div>
</template>

<script>
  import FLoading1 from './loading/loading-1'
  import FEmpty from './empty'
  import {throttle} from "js-utils";
  import FLoading2 from "./loading/loading-2";

  export default {
    name: 'f-list',
    props: {
      loading: {
        type: Boolean,
        default: false,
        required: true
      },
      eof: {
        type: Boolean,
        default: false
      },
      dataLength: {
        type: Number,
        default: 0
      },
      emptyText: {
        type: String,
        default: '-暂无数据-'
      },
      scrollFlag: {
        type: Boolean,
        default: false
      },
      bodyScroll: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        startY: 0,
        startX: 0,
        toTopFlag: false,
        isRefresh: false,
        zoomIn: false,
        successFlag: false,
        topId: null,
        emitLoadHeight: 100,
        resetY: false,
        movable: true,
        firstChange: true,
      }
    },
    components: {
      FLoading2,
      FLoading1,
      FEmpty
    },
    methods: {
      getScrollSize() {
        if (this.bodyScroll) {
          let el = document.documentElement;
          return {
            ST: document.body.scrollTop || el.scrollTop,
            OH: window.innerHeight,
            SH: el.scrollHeight,
          }
        } else {
          let scrollBox = this.$refs.scrollBox;
          return {
            ST: scrollBox.scrollTop,
            OH: scrollBox.offsetHeight,
            SH: scrollBox.scrollHeight,
          }
        }
      },
      handleStart(e) {
        this.startY = e.touches[0].pageY;
        this.startX = e.touches[0].pageX;
      },
      handleMove(e) {
        let scrollBox = this.$refs.scrollBox;
        if (this.loading || !scrollBox || !this.movable) {
          return false;
        }
        let {ST} = this.getScrollSize();
        let spinBox = this.$refs.spinBox;
        let circle = this.$refs.circle;
        let curY = e.changedTouches[0].pageY;
        let curX = e.changedTouches[0].pageX;
        let translateX = curX - this.startX;
        let translateY = curY - this.startY;
        if (this.firstChange && Math.abs(translateY) < Math.abs(translateX)) {
          this.movable = false;
          return false;
        }
        this.firstChange = false;

        if (ST === 0 && curY > this.startY) {
          e.preventDefault();
          if (!this.resetY) {
            this.startY = curY;
            this.resetY = true;
          }
          this.zoomIn = false;
          let H = curY - this.startY;
          spinBox.style.top = H - H / 2 + 'px';
          if (H > 50 && H < 140) {
            circle.style.strokeDasharray = H - 50 + ', 200';
          } else if (H >= 140) {
            circle.style.strokeDasharray = '90, 200';
            this.setRotateZ(this.$refs.spin, H - 140);
            // this.$refs.spin.style.transform = 'rotateZ(' + (H - 140) + 'deg)';
          }
        }
      },
      handleEnd(e) {
        this.movable = true;
        this.firstChange = true;
        this.resetY = false;
        let spinBox = this.$refs.spinBox;
        let top = this.getStyle(spinBox, 'top');
        switch (true) {
          case top <= 0:
            return;
          case top >= 60:
            if (this.loading)
              return;
            this.isRefresh = true;
            this.$emit('refresh', true);
            setTimeout(this.moveBack, 0, 60);
            break;
          default:
            this.moveBack();
            break;
        }
      },
      getStyle(el, item) {
        return +(el.style[item].replace(/[^0-9\-\.]/ig, ''));
      },
      resetStyle() {
        this.$refs.spinBox.style = '';
        this.$refs.spin.style = '';
        this.$refs.circle.style = 'stroke-dasharray:1,200';
      },
      setRotateZ(el, deg) {
        el.style.transform = 'rotateZ(' + deg + 'deg)';
      },
      handleWait() {
        let spin = this.$refs.spin;
        // let circle=this.$refs.circle;
        let deg = this.getStyle(spin, 'transform');
        this.setRotateZ(spin, deg - 5);
        // spin.style.transform = 'rotateZ(' + (rotate - 5) + 'deg)';
        // circle.style.transform='rotateZ('+ (rotate - 10) + 'deg)';
        if (!this.loading) {
          this.zoomIn = true;
          this.moveBack();
          return;
        }
        requestAnimationFrame(() => this.handleWait());
      },
      moveBack(h) {
        let spinBox = this.$refs.spinBox;
        let spin = this.$refs.spin;
        let circle = this.$refs.circle;
        let top = this.getStyle(spinBox, 'top');
        if (top - 10 <= (h || 0)) {
          spinBox.style.top = (h || 0) + 'px';
          if (h) {
            return this.handleWait();
          } else {
            // spin.style.transform = 'rotateZ(0deg)';
            this.setRotateZ(spin, 0);
            circle.style.strokeDasharray = '1,200';
            return;
          }
        }
        spinBox.style.top = top - 10 + 'px';
        let deg = this.getStyle(spin, 'transform');
        this.setRotateZ(spin, deg - 20);
        // spin.style.transform = 'rotateZ(' + (rotate - 20) + 'deg)';
        requestAnimationFrame(() => this.moveBack(h));
      },
      scrollCb(e) {
        let {ST, OH, SH} = this.getScrollSize();
        if ((SH - ST < OH + this.emitLoadHeight) && !this.eof && !this.loading) {
          this.$emit('loadMore', true);
        }
        if (ST > 300) {
          this.toTopFlag = true;
          clearTimeout(this.topId);
          this.topId = setTimeout(() => {
            this.toTopFlag = false;
          }, 3000)
        } else {
          this.toTopFlag = false;
        }
      },
      toTop() {
        if (this.bodyScroll) {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        } else {
          this.$refs.scrollBox.scrollTop = 0;
        }

      },
      handleScroll() {}
    },
    computed: {},
    watch: {
      loading(val) {
        if (this.isRefresh && !val) {
          this.isRefresh = false;
          setTimeout(() => {
            this.successFlag = true;
            this.moveBack();
            setTimeout(() => {
              this.successFlag = false;
            }, 1000)
          }, 400)
        }
      }
    },
    created() {
      if (this.bodyScroll){
        this.handleBodyScroll = throttle(this.scrollCb, 50);
      }else{
        this.handleScroll = throttle(this.scrollCb, 50);
      }
    },
    mounted() {
      if (this.bodyScroll)
        addEventListener("scroll", this.handleBodyScroll);
    },
    beforeDestroy() {
      if (this.bodyScroll)
        removeEventListener("scroll", this.handleBodyScroll);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/list";
</style>
