<template>
  <div class="main-title">
    <span class="left">
      <slot name="left">
      <i class="back-icon" @click="routeBack">&#xe682;</i>
    </slot>
    </span>
    <span class="mid"><slot/></span>
    <span class="right">
      <slot name="right">
<!--      <i @click="routeTo('/')" class="home-icon">&#xe665;</i>-->
    </slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: "f-title",
    props: {},
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/title";
</style>
