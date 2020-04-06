<template>
  <div class="skeleton">
    <slot v-if="!loading"></slot>
    <template v-else>
      <ul class="line-list" v-for="item in row">
        <li v-for="item in 4"></li>
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
