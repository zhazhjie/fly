/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-06-15 10:30:20
* @version: 1.0
*/

<template>
  <transition name='fade'>
    <div class="msg" :style="{width,height}" :class='typeClass' v-show="showFlag" v-if="showFlag||initFlag">
      <i></i>
      <p>{{text}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'el-msg',
    data() {
      return {
        text: '',
        type: 0,
        showFlag: false,
        tId: null,
        width: 'auto',
        height: 'auto',
        initFlag: false
      }
    },
    computed: {
      typeClass() {
        switch (true) {
          case this.type === 1:
            return 'success';
          case this.type === 2:
            return 'warning';
          case this.type === 3:
            return 'error';
          case this.type === 4:
            return 'waiting';
          default:
            return 'normal';
        }
      }
    },
    components: {},
    watch: {
      showFlag(val) {
        if (val && !this.initFlag) {
          this.initFlag = true;
        }
      }
    },
    methods: {
      showMsg(data) {
        if (Object.prototype.toString.call(data) === "[object Object]") {
          this.text = data.text || "";
          this.type = data.type || 0;
        } else {
          this.text = data;
          this.type = 0;
        }
        this.showFlag = true;
        clearTimeout(this.tId);
        this.tId = setTimeout(() => {
          this.showFlag = false;
        }, 2000)
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>

  .msg {
    position: fixed;
    left: 50%;
    top: 50%;
    border-radius: 0.1rem;
    padding: 0.2rem 0.3rem;
    z-index: 99999;
    align-items: center;
    /*box-shadow: 0 0 0.05rem rgba(0, 0, 0, .3);*/
    background-color: rgba(36, 36, 36, .8);
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .msg i {
    font-family: 'iconfont-common';
    font-size: 0.3rem;
  }

  .msg p {
    margin-top: 0.1rem;
    letter-spacing: 2px;
  }

  .normal {
    /* background-color: #fff; */
    color: #fff;
    /* border: 1px solid #D4D6DB; */
    animation: slide-in 0.2s;
  }

  .normal i::before {
    content: '\e8ea';
  }

  .success {
    /* background-color: #f0f9eb; */
    color: #fff;
    /* border: 1px solid #BFE3AD; */
    animation: slide-in 0.2s;
  }

  .success i::before {
    content: '\e8e4';
    color: $green;
  }

  .warning {
    /* background-color: #fdf6ec; */
    color: #fff;
    /* border: 1px solid #ECD0A6; */
    animation: slide-in 0.2s;
  }

  .warning i::before {
    content: '\e8ec';
  }

  .error {
    /* background-color: #fef0f0; */
    color: #fff;
    /* border: 1px solid #F2B5B5; */
    animation: slide-in 0.2s;
  }

  .error i::before {
    content: '\e8e7';
  }

  .waiting {
    color: #fff;
    animation: slide-in 0.2s;
  }

  .waiting i {
    transform: rotate(270deg);
    display: inline-block;
  }

  .waiting i::before {
    content: '\e605';
  }

  @keyframes slide-in {
    0% {
      transform: translate(-50%, -100%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }

  @keyframes shaking {
    10%, 50%, 90% {
      transform: translate(-53%, -50%);
    }
    30%, 70% {
      transform: translate(-47%, -50%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
</style>
