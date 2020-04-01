/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-05-10 11:44:59
* @version: 1.0
*/

<template>
  <label class="checkbox" :class="[getSize]">
    <input
      ref="input"
      class="input"
      type="checkbox"
      :checked="isChecked"
      @change='change'
      :disabled='disabled'>
    <i class="icon" :class="[color]"></i>
    <span class="slot" v-if="$slots.default">
      <slot/>
    </span>
  </label>
</template>

<script>
  import {mixins} from "./mixins";

  export default {
    name: 'f-checkbox',
    mixins: [mixins],
    props: {
      value: {
        type: [String, Number, Array, Boolean]
      },
      label: {
        type: [String, Number]
      },
      disabled: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: ""
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
    methods: {
      change(e) {
        if (this.label && Array.isArray(this.value)) {
          let index = this.value.indexOf(this.label);
          if (index > -1) {
            this.value.splice(index, 1);
          } else {
            this.value.push(this.label);
          }
        } else {
          this.$emit('input', e.target.checked);
        }
      }
    },
    computed: {
      isChecked() {
        if (this.label && Array.isArray(this.value)) {
          let index = this.value.indexOf(this.label);
          return index > -1;
        } else {
          return this.value;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
 @import "../style/checkbox";
</style>
