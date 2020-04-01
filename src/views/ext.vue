<template>
  <iframe frameborder="0" height="100%" width="100%" :src="src">

  </iframe>
</template>

<script>
  export default {
    name: "f-ext",
    props:{
      src:String
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>

</style>
