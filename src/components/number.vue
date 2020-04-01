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
  export default {
    name: 'f-number',
    props: {
      value: {
        type: [String, Number],
        default: 1
      },
      maxValue: {
        type: [String, Number],
        default: 9999
      },
      minValue: {
        type: [String, Number],
        default: 1
      },
      size: {
        type: String,
        default: 'small'
      },
    },
    data() {
      return {}
    },
    components: {},
    watch: {},
    methods: {
      changeNum(isAdd) {
        let value;
        if (isAdd) {
          value = this.maxValue && this.value >= this.maxValue ? this.maxValue : +this.value + 1;
        } else {
          value = this.minValue && this.value <= this.minValue ? this.minValue : this.value - 1;
        }
        this.$emit('input', value);
      },
      setValue(e) {
        let value = e.target.value | 0;
        if (value < this.minValue || value > this.maxValue) {
          e.target.value = this.value;
        } else {
          this.$emit('input', value);
        }
      }
    },
    computed: {},
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/number";
</style>
