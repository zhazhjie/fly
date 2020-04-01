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
        v-show="value>0">&#xe6ce;
      </button>
    </transition>
    <transition name="rotate-out">
      <span class="value" v-show="value>0">{{value}}</span>
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
  export default {
    name: 'f-input-number',
    props: {
      value: {
        type: [String, Number],
        default: 0
      },
      maxValue: {
        type: [String, Number],
        default: 9999
      },
      minValue: {
        type: [String, Number],
        default: 0
      },
      size: {
        type: String,
        default: 'small'
      },
      disabled: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {}
    },
    components: {},
    watch: {},
    methods: {
      changeNum(isAdd, e) {
        if (this.disabled) return;
        let value;
        if (isAdd) {
          value = this.maxValue && this.value >= this.maxValue ? this.maxValue : +this.value + 1;
          this.$emit('add', {value, e});
        } else {
          value = this.minValue && this.value <= this.minValue ? this.minValue : this.value - 1;
          this.$emit('subtract', {value, e});
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
  @import "../style/inputNumber";
</style>
