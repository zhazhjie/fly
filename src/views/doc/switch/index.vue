<template>
  <section>
    <p class="title">代码演示</p>
    <div class="box">
      <div class="box-title">基础用法</div>
        <f-code lang="html">{{base}}</f-code>
    </div>
    <p class="title">API</p>
    <div class="box">
      <div class="box-title">Props</div>
      <f-table :data="propList" type="prop"></f-table>
    </div>
  </section>
</template>

<script>
  import {base} from "./code";
  import FTable from "../table";
  import FCode from "../code";

  export default {
    name: "button-doc",
    components: {FCode, FTable},
    data() {
      return {
        base: base,
        propList: [
          {
            param: "value/v-model",
            explain: "绑定值",
            type: "string/number",
            optionalValue: "",
            defaultValue: ""
          },
          {
            param: "trueValue",
            explain: "打开时的值",
            type: "string/number/boolean",
            optionalValue: "-",
            defaultValue: "true"
          },
          {
            param: "falseValue",
            explain: "关闭时的值",
            type: "string/number/boolean",
            optionalValue: "-",
            defaultValue: "false"
          },
          {
            param: "size",
            explain: "尺寸",
            type: "string",
            optionalValue: "small/mini",
            defaultValue: "small"
          },
          {
            param: "color",
            explain: "颜色",
            type: "string",
            optionalValue: "primary/red/blue/orange/green/yellow/gray/black",
            defaultValue: "primary"
          },
          {
            param: "disabled",
            explain: "禁用状态",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
        ]
      }
    },
    methods: {},
    mounted() {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }
</script>

<style lang="scss" scoped>

</style>
