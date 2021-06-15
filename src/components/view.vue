<template>
  <section :class="title?'view':''">
    <f-title v-if="!!title">
      <template slot="left">
        <slot name="title-left"></slot>
      </template>
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
      <router-view class='child-router' :class="isIOS?'scroll-box':''"/>
    </transition>
  </section>
</template>

<script>
  import FTitle from "./title";
  import {Validate} from "js-utils/validate";

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
      return {
        isIOS: Validate.isIOS()
      }
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

  .child-router {
    overflow-y: auto;
  }
</style>
