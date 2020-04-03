<template>
  <div class="rate-box">
    <ul class="rate-value">
      <li
        v-for="(item,index) in scores"
        @click="setValue(item,index)"
        v-show="item.value<=value">
        <i :class="getSize">&#xe600;</i>
      </li>
    </ul>
    <ul class="rate-bg">
      <li
        v-for="(item,index) in scores"
        @click="setValue(item,index)">
        <i :class="getSize">&#xe600;</i>
      </li>
    </ul>
    <span style="margin-left: 0.1rem" v-if="showText">{{curScoreText}}</span>
  </div>
</template>

<script>
  import {mixins} from "./mixins";

  export default {
    name: "f-rate",
    mixins: [mixins],
    props: {
      value: {
        type: [Number, String],
        default: 0
      },
      readonly: {
        type: Boolean,
        default: false
      },
      showText: {
        type: Boolean,
        default: true
      },
      scores: {
        type: Array,
        default: () => ([
          {
            text: "差",
            value: 1
          },
          {
            text: "一般",
            value: 2
          },
          {
            text: "满意",
            value: 3
          },
          {
            text: "很满意",
            value: 4
          },
          {
            text: "非常满意",
            value: 5
          },
        ])
      }
    },
    data() {
      return {
        curIndex: 0,
      }
    },
    methods: {
      setValue(item, index) {
        this.curIndex = index;
        this.$emit("input", item.value)
      }
    },
    computed: {
      curScoreText() {
        let text = "";
        this.scores.forEach(score => {
          if (score.value === this.value) {
            text = score.text;
          }
        });
        return text;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/rate";
</style>
