/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-06-16 11:51:37
* @version: 1.0
*/

<template>
  <div class="select">
    <f-input
      ref="input"
      @click='handleClick'
      @blur='handleBlur'
      @input='handleInput'
      :readonly='!filterable'
      :size="size"
      :color="color"
      :value="getValue(curItem,1)"
      :placeholder="placeholder">
      <i slot="suffix" class="more-icon" :class='showFlag?"rotate180":""'>&#xe680;</i>
    </f-input>
    <transition name='slide'>
      <div class="select-list" v-show='showFlag'>
        <ul class="scroll-box" @touchmove.stop>
          <li
            :class='[curItem===item?"active":"",color,size]'
            v-for='(item,index) in filterList'
            @click='selectItem(item)'>
            <slot :item="item">{{getValue(item,1)}}</slot>
          </li>
          <li class='not-data' v-if='!filterList.length'>-无数据-</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import fInput from './input';

  export default {
    name: 'f-select',
    props: {
      value: {
        type: [String, Object, Number]
      },
      list: {
        type: Array,
        required: true
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      filterable: {
        type: Boolean,
        default: false,
      },
      defaultProps: {
        type: Object,
        default: () => {
          return {value: 'value', text: 'text'}
        }
      },
      color: {
        type: String,
      },
      size: {
        type: String,
        default: 'small'
      }
    },
    data() {
      return {
        showFlag: false,
        curItem: null,
        filterList: this.list
      }
    },
    components: {
      fInput
    },
    methods: {
      handleClick() {
        this.showFlag = !this.showFlag;
      },
      handleBlur(e) {
        this.showFlag = false;
        if (!this.filterable) return;
        this.$refs.input.$el.querySelector("input").value = this.getValue(this.curItem, 1) || "";
        setTimeout(() => {
          this.filterList = this.list;
        }, 300)
      },
      getValue(item, type) {
        return this.isObj(item) ? item[this.defaultProps[type ? 'text' : 'value']] : item;
      },
      isObj(item) {
        return Object.prototype.toString.call(item) === '[object Object]';
      },
      selectItem(item) {
        this.curItem = item;
        let value = this.getValue(item);
        this.$emit('input', value);
        this.$emit('change', item);
      },
      handleInput(value) {
        this.showFlag = true;
        this.filterList = this.list.filter(el => new RegExp(value, 'ig').test(this.getValue(el, 1)));
      },
      handleValueChange() {
        this.filterList = this.list;
        this.curItem = this.list.find(v => this.getValue(v) === this.value);
      }
    },
    watch: {
      list: 'handleValueChange',
      value: 'handleValueChange'
    },
    computed: {},
    mounted() {
      this.handleValueChange();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/select";
</style>
