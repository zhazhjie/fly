<template>
  <div class="carousel-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "f-carousel-item",
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>
  .carousel-item {
    flex-shrink: 0;
    width: 100%;
    position: relative;
  }
  .carousel-item img{
    vertical-align: top;
  }
</style>
