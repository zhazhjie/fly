<template>
  <section class="index">
    <f-header></f-header>
    <f-nav></f-nav>
    <main class="main">
      <transition name='fade-right' mode="out-in">
        <router-view/>
      </transition>
    </main>
    <div class="preview">
      <f-ext class="win" :src="previewSrc"></f-ext>
      <div class="tip">
        <p>部分touch事件在预览无法生效，请在手机中查看</p>
        <div ref="qrCode"></div>
      </div>
    </div>
  </section>
</template>

<script>
  import FExt from "../ext";
  import FNav from "./nav";
  import FHeader from "./header";
  import QRCode from "js-utils/qrcode"

  export default {
    name: "index",
    components: {FHeader, FNav, FExt},
    data() {
      return {
        previewSrc: location.origin + location.pathname + "#/preview"
      }
    },
    methods: {
      buildQrCode() {
        this.$nextTick(() => {
          let dom = this.$refs.qrCode;
          dom.innerHTML = "";
          new QRCode(dom, {
            text: this.previewSrc,
            width: 100,
            height: 100,
          });
        });
      }
    },
    mounted() {
      this.buildQrCode();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../css/mixin";
  .index {
    padding: 50px 400px 0 235px;
    min-height: 100vh;
    min-width: 1200px;

    .main {
      position: relative;
      /*background: #fff;*/
    }

    .preview {

      position: fixed;
      top: 60px;
      right: 10px;
      .win{
        width: 375px;
        height: 667px;
        /*overflow: hidden;*/
        box-shadow: 0 0 10px 0 $shadow;
      }
      .tip{
        color: $gray;
        @include flex-center;
        p{
          margin: 5px 0;
        }
      }
    }
  }

</style>
