/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-05-11 11:25:29
* @version: 1.0
*/

<template>
  <transition name="fade">
    <div class="dialog-wrapper" v-show='showFlag' @touchstart='handleStart' @touchend='handleEnd'
         @touchmove='handleMove'>
      <div class="modal"></div>
      <div class="dialog" ref='dialog' :style='getStyle'>
        <div class="header">
          <span class="title" data-type="move">{{title}}</span>
          <span class="opt">
            <i v-show="maxFlag" @click='maxWin'>&#xe7fe;</i>
            <i v-show="!maxFlag" @click='maxWin'>&#xe6fb;</i>
            <i @click="closeWin">&#xe601;</i>
          </span>
        </div>
        <div class="content">
          <slot/>
        </div>
        <div class="footer">
          <f-button type="plain" @click='closeWin'>取消</f-button>
          <f-button @click='submit'>确定</f-button>
          <div class="resize" data-type='resize'></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'f-dialog',
    props: {
      title: {
        type: String,
        default: "标题"
      },
      showFlag: {
        type: Boolean
      },
      reset: {
        type: Boolean
      },
      width: {
        type: Number,
        default: 300
      },
      height: {
        type: Number,
        default: 300
      },
      top: {
        type: Number,
      },
      left: {
        type: Number,
      }
    },
    data() {
      return {
        startX: 0,
        startY: 0,
        startTop: 0,
        startLeft: 0,
        startWidth: 0,
        startHeight: 0,
        curTop: 0,
        curLeft: 0,
        curWidth: this.width,
        curHeight: this.height,
        minWidth: 240,
        minHeight: 150,
        canMove: false,
        canResize: false,
        maxFlag: false
      }
    },
    components: {},
    methods: {
      submit() {
        this.closeWin();
        this.$emit('submit', false)
      },
      closeWin() {
        this.$emit('update:showFlag', false)
      },
      handleEnd(e) {
        this.canMove = false;
        this.canResize = false;
      },
      handleStart(e) {
        if (this.maxFlag) {
          return;
        }
        let dialog = this.$refs.dialog;
        let type = e.target.dataset.type;
        let event = e.targetTouches[0];
        this.startX = event.pageX;
        this.startY = event.pageY;
        if (type === 'move') {
          this.startTop = dialog.offsetTop;
          this.startLeft = dialog.offsetLeft;
          this.canMove = true;
        } else if (type === 'resize') {
          this.startWidth = dialog.offsetWidth;
          this.startHeight = dialog.offsetHeight;
          this.canResize = true;
        }
      },
      handleMove(e) {
        e.preventDefault();
        let event = e.targetTouches[0];
        if (this.canMove) {
          this.curLeft = event.pageX - this.startX + this.startLeft;
          this.curTop = event.pageY - this.startY + this.startTop;
        } else if (this.canResize) {
          let curWidth = event.pageX - this.startX + this.startWidth;
          let curHeight = event.pageY - this.startY + this.startHeight;
          this.curWidth = curWidth < this.minWidth ? this.minWidth : curWidth;
          this.curHeight = curHeight < this.minHeight ? this.minHeight : curHeight;
        }
      },
      maxWin() {
        this.maxFlag = !this.maxFlag;
      },
      setPosition() {
        this.curTop = this.top === undefined ? (window.innerHeight - this.height) >> 1 : this.top;
        this.curLeft = this.left === undefined ? (window.innerWidth - this.width) >> 1 : this.left;
      }
    },
    computed: {
      getStyle() {
        if (this.maxFlag) {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth + "px",
            height: window.innerHeight + "px"
          };
        } else {
          return {
            top: this.curTop + "px",
            left: this.curLeft + "px",
            width: this.curWidth + "px",
            height: this.curHeight + "px"
          };
        }
      }
    },
    watch: {
      showFlag(val) {
        if (val && this.reset) {
          this.curWidth = this.width;
          this.curHeight = this.height;
          this.setPosition();
        }
      }
    },
    mounted() {
      this.setPosition();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/dialog";
</style>
