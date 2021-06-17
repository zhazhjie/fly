/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-06-12 17:52:54
* @version: 1.0
*/

<template>
  <transition name='fade'>
    <div class="popup-wrapper" :style="{zIndex}" v-show='showFlag' :data-closable='true' @click='emitClose'
         v-if="showFlag||initFlag">
      <div class="popup" :class='[position]'
           :style="{maxHeight: position==='middle'||position==='bottom'?maxHeight:null}">
        <div class="popup-title">
          <div v-if="title" v-html="title"></div>
          <slot v-else name='title'>提示</slot>
        </div>
        <slot name='header'/>
        <slot name='out'/>
        <div class="popup-content scroll-box">
          <div v-if="content" v-html="content"></div>
          <slot v-else/>
        </div>
        <slot name="footer"/>
        <div class="operate" v-if='!simple&&position==="middle"'>
          <f-button type="plain" size='small' @click='handleClose'>取消</f-button>
          <f-button size='small' @click='handleSubmit' :loading="loading">确认</f-button>
        </div>
        <i class="close" v-else @click='handleClose'>×</i>
      </div>
    </div>
  </transition>
</template>

<script>
import fButton from '../button';
import {Validate} from "js-utils/validate";

export default {
  name: 'f-popup',
  props: {
    showFlag: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'middle'
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    simple: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 99
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: String,
      default: "90vh"
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      initFlag: false
    }
  },
  components: {fButton},
  watch: {
    showFlag(val) {
      this.setBodyScroll(!val);
      if (val && !this.initFlag) {
        this.initFlag = true;
      }
    }
  },
  methods: {
    emitClose(e) {
      if (e.target.dataset.closable && this.closeOnClickModal) {
        this.handleClose();
      }
    },
    handleClose() {
      this.$emit('update:showFlag', false)
    },
    handleSubmit() {
      //this.handleClose();
      this.$emit('submit');
    },
    setBodyScroll(flag) {
      if (!Validate.isWeiXin()) {
        document.body.style.overflow = flag ? "auto" : "hidden";
      }
    },
    init() {
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    },
    clear() {
      if (this.appendToBody) {
        document.body.removeChild(this.$el);
      }
    }
  },
  computed: {},
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.clear();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/popup";
</style>
