/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-05-10 11:39:46
* @version: 1.0
*/

<template>
  <label class="radio" :class="[size]">
    <input
      ref="input"
      class="input"
      type="radio"
      :name="group+value"
      :checked="isChecked"
      @change='change'
      :disabled='disabled'>
    <i class="icon" :class="[color]"></i>
    <span class="slot" v-if="$slots.default"><slot/></span>
  </label>
</template>

<script>
  export default {
    name: 'f-radio',
    props: {
      value: {
        type: [String, Number]
      },
      disabled: {
        type: Boolean,
        default: false
      },
      label: {
        type: [String, Number]
      },
      group: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "primary"
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
      value(val) {
        this.$refs.input.checked = this.isChecked;
      }
    },
    methods: {
      change(e) {
        this.$emit('input', this.label);
      }
    },
    computed: {
      isChecked() {
        return this.value === this.label;
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/radio";
</style>
