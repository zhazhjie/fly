<template>
  <section class="index">
    <f-nav></f-nav>
    <main class="main">
      <transition name='fade-right'>
        <router-view/>
      </transition>
    </main>
    <div class="preview">
      <f-ext :src="previewSrc"></f-ext>
    </div>
  </section>
</template>

<script>
  import FExt from "../ext";
  import FNav from "./nav";

  export default {
    name: "index",
    components: {FNav, FExt},
    data() {
      return {
        previewSrc: location.origin + location.pathname + "#/preview"
      }
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .index {
    display: flex;
    padding: 0 400px 0 235px;
    min-height: 100vh;

    .main {
      flex: 1;
      /*background: #fff;*/
    }

    .preview {
      width: 375px;
      height: 667px;
      overflow: hidden;
      position: fixed;
      top: 10px;
      right: 10px;
      box-shadow: 0 0 10px 0 $shadow;
    }
  }

</style>
