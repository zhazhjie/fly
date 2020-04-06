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
            param: "list",
            explain: "选项列表",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "defaultProps",
            explain: "选项的默认字段",
            type: "object",
            optionalValue: "-",
            defaultValue: '{value: "value", text: "text"}'
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
            param: "filterable",
            explain: "是否可过滤",
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
            param: "round",
            explain: "圆角",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "rows",
            explain: "行数，仅对类型为textarea有效",
            type: "number",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "placeholder",
            explain: "占位文本",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
        ]
      }
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>

</style>
