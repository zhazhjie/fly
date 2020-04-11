<template>
  <div class="loading">
    <ul>
      <li v-for="item in 3"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "f-loading-3",
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/loading/loading-3";
</style>
