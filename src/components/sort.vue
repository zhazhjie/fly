<template>
  <div class="sort" @click="handleChange">
    <span :class="value===1||value===2?'active':''"><slot/></span>
    <span class="opt-box">
        <i class="sort-btn up-btn" :class="value===1?'active':''"></i>
        <i class="sort-btn down-btn" :class="value===2?'active':''"></i>
      </span>
  </div>
</template>

<script>
  export default {
    name: "f-sort",
    props: {
      value: {
        type: Number,
        default: 0  // 0不排序，1升序，2降序
      }
    },
    data() {
      return {}
    },
    methods: {
      handleChange() {
        if (this.value === 1) {
          this.$emit("input", 2);
        } else if (this.value === 2) {
          this.$emit("input", 0);
        } else {
          this.$emit("input", 1);
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/sort";
</style>
