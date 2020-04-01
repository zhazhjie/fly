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
        <div class="loading"><i class="icon-common">&#xe604;</i></div>
        <p>加载中...</p>
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    name: 'f-loading',
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
    watch: {
      showFlag(val) {
        if (val && !this.initFlag) {
          this.initFlag = true;
        }
      }
    },
    methods: {},
    computed: {},
    mounted() {
      // this.showFlag = true;
    }
  }
</script>

<style scoped>
  #loading-wrap {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
  }

  #loading {
    color: #fff;
    text-align: center;
    background-color: rgba(36, 36, 36, .7);
    padding: 0.2rem 0.3rem;
    border-radius: 0.1rem;
    font-size: 0.14rem;
  }

  #loading p {
    margin-top: 0.1rem;
    letter-spacing: 2px;
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

  .loading {
    position: relative;
    width: 0.3rem;
    height: 0.3rem;
    margin: 0 auto;
  }

  .loading i {
    display: block;
    transform-origin: center;
    font-size: 0.25rem;
    animation: rotate 3s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
