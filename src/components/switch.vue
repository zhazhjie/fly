/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-05-10 11:45:39
* @version: 1.0
*/

<template>
  <label class="switch" :class="[getSize]">
    <input
      ref="input"
      class="input"
      type="checkbox"
      :checked="isChecked"
      @change='change'
      :disabled='disabled'>
    <i class="icon" :class="[color]"></i>
    <span class="slot" v-if="$slots.default"><slot/></span>
  </label>
</template>

<script>
  import {mixins} from "./mixins";

  export default {
    name: 'f-switch',
    mixins: [mixins],
    props: {
      value: {
        type: [Boolean, Number, String]
      },
      disabled: {
        type: Boolean,
        default: false
      },
      trueValue: {
        type: [Boolean, Number, String],
        default: undefined
      },
      falseValue: {
        type: [Boolean, Number, String],
        default: undefined
      },
      color: {
        type: String
      },
      size: {
        type: String,
        default: ""
      }
    },
    data() {
      return {}
    },
    watch: {
      value() {
        this.$refs.input.checked = this.isChecked;
      }
    },
    computed: {
      isChecked() {
        return this.value === this.trueValue ? true : this.value === this.falseValue ? false : !!this.value;
      }
    },
    methods: {
      change(e) {
        let checked = e.target.checked;
        let value = checked ? (this.trueValue === undefined ? true : this.trueValue) : (this.falseValue === undefined ? false : this.falseValue);
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "../style/switch";
</style>
