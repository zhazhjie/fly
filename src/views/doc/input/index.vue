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
    <div class="box">
      <div class="box-title">Slots</div>
      <f-table :data="slotList" type="slot"></f-table>
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
            param: "type",
            explain: "输入框类型",
            type: "string",
            optionalValue: "input/textarea",
            defaultValue: "input"
          },
          {
            param: "size",
            explain: "尺寸",
            type: "string",
            optionalValue: "normal/small/mini",
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
            param: "clearable",
            explain: "是否可清除",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "disabled",
            explain: "禁用状态",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "readonly",
            explain: "只读状态",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "placeholder",
            explain: "占位文本",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
        ],
        slotList:[
          {
            name: "prefix",
            explain: "输入框前缀",
          },
          {
            name: "suffix",
            explain: "输入框后缀",
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
