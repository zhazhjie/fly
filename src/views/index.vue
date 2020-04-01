<template>
  <div class="preview">
    <f-ext src="/#/preview"></f-ext>
  </div>
</template>

<script>
  import FExt from "./ext";
  export default {
    name: "index",
    components: {FExt},
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
.preview{
  width: 375px;
  height: 667px;
  overflow: hidden;
  position: fixed;
  top: 20px;
  right: 20px;
  box-shadow: 0 0 5px 0 $shadow;
  border-radius: 5px;
}
</style>
