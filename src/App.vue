<template>
  <div id="app">
    <transition name='fade-right'>
      <router-view class='router-view'/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {

    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  @import "./css/global";
</style>
