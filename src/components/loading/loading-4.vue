/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-04-27 14:48:34
* @version: 1.0
*/

<template>
  <transition name='fade'>
    <div id="loading-wrap" v-show="showFlag" v-if="showFlag||initFlag">
      <div id="loading">
        <span>L</span>
        <f-loading-2/>
        <span>ADING</span>
        <span class="point">
          <i>...</i>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>

  import FLoading2 from "./loading-2";
  export default {
    name: 'f-loading-4',
    props: {
      showFlag: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        initFlag: false,
      }
    },
    components: {
      FLoading2

    },
    watch: {
      showFlag(val) {
        if (val && !this.initFlag) {
          this.initFlag = true;
        }
      }
    },
    methods: {},
    computed: {},
    mounted() {}
  }
</script>

<style scoped>
  #loading-wrap {
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  body > #loading-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
  }

  #loading {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
  }

  .point {
    position: relative;
    width: 1em;
    height: 1em;
    display: flex;
    align-items: center;
  }

  .point i {
    height: 1em;
    line-height: 1em;
    position: absolute;
    overflow: hidden;
    animation: point 1.5s ease-in-out infinite;
  }

  @keyframes point {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }
  .fade-leave-active,
  .fade-enter-active {
    transition: all .3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
