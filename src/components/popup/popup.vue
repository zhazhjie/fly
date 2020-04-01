/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-06-12 17:52:54
* @version: 1.0
*/

<template>
  <transition name='zoom-in'>
    <div class="popup-wrapper" :style="{zIndex}" v-show='showFlag' :data-close='1' @click='emitClose'
         v-if="showFlag||initFlag">
      <div class="popup" :class='[position]' :style="{maxHeight: maxHeight}">
        <div class="popup-title">
          <div v-if="title" v-html="title"></div>
          <slot v-else name='title'>提示</slot>
        </div>
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
        if (e.target.dataset.close && this.closeOnClickModal) {
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
        // document.body.style.overflow = flag ? "auto" : "hidden";
      }
    },
    computed: {},
    mounted() {

    },
    beforeDestroy() {
      this.setBodyScroll(true);
    }
  }
</script>

<style scoped>

  .popup-wrapper {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    border-radius: 0.05rem;
    padding: 0.15rem;
    background: #fff;
    box-shadow: 1px 1px 10px 0 #666;
    display: flex;
    flex-direction: column;
  }

  .middle {
    position: relative;
    width: 6rem;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0.1rem 0.1rem 0 0;
    border: 0;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    height: 0.3rem;
    width: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.25rem;
    cursor: pointer;
    text-align: center;
    color: #999;
    user-select: none;
  }

  .close:active {
    opacity: 0.8;
  }

  .popup-title {
    font-size: 0.18rem;
    margin-bottom: 0.15rem;
  }

  .center .popup-title {
    border-bottom: none;
  }

  .popup-content {
    flex: 1;
    /*max-height: calc(100vh - 1.5rem);*/
    overflow: auto;
  }

  .bottom .popup-content {
    /*max-height: calc(100vh - 3rem);*/
  }

  .operate {
    display: flex;
    justify-content: flex-end;
    margin: 0.2rem 0 0;
  }

  .zoom-in-enter-active,
  .zoom-in-leave-active {
    transition: all 0.25s;
  }

  .zoom-in-enter-active .middle,
  .zoom-in-leave-active .middle {
    transition: all 0.25s;
  }

  .zoom-in-enter .middle,
  .zoom-in-leave-to .middle {
    transform: scale3d(.1, .1, .1);
  }

  .zoom-in-enter-active .bottom,
  .zoom-in-leave-active .bottom {
    transition: all 0.25s;
  }

  .zoom-in-enter .bottom,
  .zoom-in-leave-to .bottom {
    transform: translateY(100%);
  }

  .zoom-in-enter,
  .zoom-in-leave-to {
    opacity: 0;
  }

  @media screen and (max-width: 600px) {
    .middle {
      width: 90%;
    }
  }
</style>
