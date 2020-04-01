<template>
  <div class="skeleton">
    <slot v-if="!loading"></slot>
    <template v-else>
      <ul class="line-list" v-for="item in row">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </template>
  </div>
</template>

<script>
  export default {
    name: "f-skeleton",
    props: {
      loading: {
        type: Boolean,
        default: true
      },
      row: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
@import "../style/skeleton";
</style>
