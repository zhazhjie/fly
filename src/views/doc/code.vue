<template>
  <pre>
      <code ref="code" :class="lang">
        <slot/>
      </code>
  </pre>
</template>

<script>
  export default {
    name: "f-code",
    props: {
      lang: {
        type: String,
        default: "javascript"
      }
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {
      hljs.highlightBlock(this.$refs.code);
    }
  }
</script>

<style lang="scss" scoped>
  pre {
    width: 100%;

    code {
      width: 100%;
    }
  }
</style>
