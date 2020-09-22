/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-12-27 11:47:21
* @version: 1.0
*/

<template>
  <div class="num-box">
    <transition name="rotate-out">
      <button
        class="sub"
        :class="[size]"
        @click.stop='changeNum(false,$event)'
        :disabled="disabled||value<=minValue"
        v-show="value>0||display">&#xe6ce;
      </button>
    </transition>
    <transition name="rotate-out">
      <input type="number" class="value" :readonly="!editable" @blur="setValue"
            v-show="value>0||display" :value="value"/>
    </transition>
    <button
      class="add"
      :class="[size]"
      @click.stop='changeNum(true,$event)'
      :disabled="disabled||value>=maxValue">&#xe6c6;
    </button>
  </div>
</template>

<script>
  import "js-utils/accuracyCalculate";
  import {mixins} from "./mixins/number";

  export default {
    name: 'f-input-number',
    mixins: [mixins],
    props: {
      value: {
        type: [Number, String],
        default: 0
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
      disabled: {
        type: Boolean,
        default: false,
      },
      editable: {
        type: Boolean,
        default: false,
      },
      display: {
        type: Boolean,
        default: false
      },
      step: {
        type: Number,
        default: 1
      },
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
  @import "../style/inputNumber";
</style>
