<template>
  <div id="app">
    <transition name='fade-right'>
      <router-view class='router-view'/>
    </transition>
  </div>
</template>

<script>
  import {getSearchParams} from "js-utils";

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
