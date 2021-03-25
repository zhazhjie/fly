/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-06-12 16:26:43
* @version: 1.0
*/

<template>
  <label class="input">
    <span class="for-text" :class='(isFocus||value.length)?"to-top":""'>{{placeholder}}</span>
    <input
      :type="type"
      class="text"
      :value='value'
      @input='change'
      :disabled='disabled'
      @focus='focus'
      @blur='blur'>
    <span class="line" :class='(isFocus||value.length)?"unfold":""'></span>
  </label>
</template>

<script>
  export default {
    name: 'f-input-2',
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
      },
      rules: {
        type: Array,
      }
    },
    data() {
      return {
        isFocus: false,
      }
    },
    components: {},
    methods: {
      change(e) {
        this.$emit('input', e.target.value)
        //console.log(e.target.value)
      },
      focus(e) {
        this.isFocus = true;
      },
      blur(e) {
        this.isFocus = false;
      }
    },
    computed: {},
    mounted() {
      //console.log(this.value)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/input-2";
</style>
