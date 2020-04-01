/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-09-20 10:40:40
* @version: 1.0
*/

<template>
  <button
    class="button"
    :class="[{loading,round},type,getSize,color]"
    :style="getStyle"
    :disabled="loading||disabled"
    @click="emitClick">
    <slot/>
  </button>
</template>

<script>
  import {mixins} from "./mixins";

  export default {
    name: 'f-button',
    mixins: [mixins],
    props: {
      type: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'small'
      },
      loading: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: 'primary',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      round: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        defaultColor: ["primary", "red", "orange", "red", "blue", "green", "gray", "black"],
      }
    },
    components: {},
    methods: {
      emitClick(e) {
        this.$emit('click', e);
      }
    },
    computed: {
      getStyle() {
        if (this.defaultColor.indexOf(this.color) > -1) return {};
        switch (this.type) {
          case "plain":
            return {
              border: "1px solid " + this.color,
              color: this.color
            };
          case "text":
            return {
              color: this.color
            };
          default:
            return {
              border: "1px solid " + this.color,
              backgroundColor: this.color
            };
        }
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
 @import "../style/button";
</style>
