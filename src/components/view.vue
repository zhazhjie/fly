<template>
  <section :class="title?'view':''">
    <f-title v-if="!!title">
      <template>{{title}}</template>
      <template slot="right">
        <slot name="title-right"></slot>
      </template>
    </f-title>
    <slot name="header"></slot>
    <div class="content" :class="scrollByBody?'':'scroll-box'">
      <slot/>
    </div>
    <slot name="footer"></slot>
    <transition :name='transitionName' v-if="routable">
      <router-view class='child-router scroll-box'/>
    </transition>
  </section>
</template>

<script>
  import FTitle from "./title";

  export default {
    name: "f-view",
    props: {
      title: {
        type: String,
        default: ""
      },
      scrollByBody: {
        type: Boolean,
        default: true
      },
      routable: {
        type: Boolean,
        default: false
      },
      transitionName: {
        type: String,
        default: 'fade-right'
      }
    },
    components: {FTitle},
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>
  .view {
    padding-top: 0.45rem;
  }
</style>
