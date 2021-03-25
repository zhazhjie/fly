/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-12-27 11:47:21
* @version: 1.0
*/

<template>
  <div class="num-box" :class="[size]">
    <button @click='changeNum(false)' :disabled="value<=minValue">&#xe7b1;</button>
    <input type="number" :value="value" @blur="setValue"/>
    <button @click='changeNum(true)' :disabled="value>=maxValue">&#xe7b0;</button>
  </div>
</template>

<script>
  import {mixins} from "./mixins/number";

  export default {
    name: 'f-number',
    mixins: [mixins],
    props: {
      value: {
        type: [String, Number],
        default: 1
      },
      maxValue: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
      },
      minValue: {
        type: Number,
        default: 0
      },
      size: {
        type: String,
        default: 'small'
      },
      step: {
        type: Number,
        default: 1
      },
      rules: {
        type: Array,
      }
    },
    data() {
      return {}
    },
    components: {},
    watch: {},
    methods: {},
    computed: {},
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/number";
</style>
