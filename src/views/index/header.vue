<template>
  <header class="header">
    <div class="left">
      <img class="logo" src="../../img/logo.png">
      <p class="primary tit">Fly</p>
    </div>
    <f-button type="plain" round>
      <a target="_blank" href="http://git.tigoyun.com/zzhijie/fly-components.git">v1.0.0</a>
    </f-button>
  </header>
</template>

<script>
  export default {
    name: "f-header",
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../css/mixin";

  .header {
    height: 50px;
    background: #fff;
    @include flex-between;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 15px;
    z-index: 3;
    box-shadow: 0 1px 5px 0 $shadow;

    .left {
      display: flex;
      align-items: center;
      font-size: 20px;

      .logo {
        width: 35px;
        margin-right: 10px;
      }

      .tit {
        background: linear-gradient(to right, $red, $orange);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .button {
      a {
        color: $primary;
      }
    }
  }
</style>
