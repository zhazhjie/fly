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
      <f-ext :src="previewSrc"></f-ext>
    </div>
  </section>
</template>

<script>
  import FExt from "../ext";
  import FNav from "./nav";
  import FHeader from "./header";

  export default {
    name: "index",
    components: {FHeader, FNav, FExt},
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
    padding: 50px 400px 0 235px;
    min-height: 100vh;

    .main {
      flex: 1;
      position: relative;
      /*background: #fff;*/
    }

    .preview {
      width: 375px;
      height: 667px;
      overflow: hidden;
      position: fixed;
      top: 60px;
      right: 10px;
      box-shadow: 0 0 10px 0 $shadow;
    }
  }

</style>
