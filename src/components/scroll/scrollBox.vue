<template>
  <div class="scroll-content">
    <div class="fade-wrap fade-top-bottom"></div>
    <i class="dividing-line dividing-line-top"></i>
    <slot/>
    <i class="dividing-line dividing-line-bottom"></i>
    <div class="fade-wrap fade-bottom-top"></div>
  </div>
</template>

<script>
  export default {
    name: "f-scroll-box",
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>
  .scroll-content {
    position: relative;
    display: flex;
    font-size: 15px;
    margin: 15px 0;
    min-height: 160px;
  }

  .fade-wrap {
    position: absolute;
    left: 0;
    background: linear-gradient(#fff, rgba(0, 0, 0, 0));
    height: 80px;
    width: 100%;
    pointer-events: none;
  }

  .fade-top-bottom {
    top: 0;
    background: linear-gradient(#fff, rgba(255, 255, 255, 0.1));
  }

  .fade-bottom-top {
    bottom: 0;
    background: linear-gradient(rgba(255, 255, 255, 0.1), #fff);
  }

  .dividing-line {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.05);
    position: absolute;
    left: 0;
    pointer-events: none;
  }

  .dividing-line-top {
    top: 80px;
  }

  .dividing-line-bottom {
    bottom: 80px;
  }
</style>
