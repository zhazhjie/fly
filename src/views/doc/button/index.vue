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
            param: "type",
            explain: "按钮类型",
            type: "string",
            optionalValue: "default/plain/text",
            defaultValue: "-"
          },
          {
            param: "size",
            explain: "按钮尺寸",
            type: "string",
            optionalValue: "big/normal/small/mini",
            defaultValue: "small"
          },
          {
            param: "color",
            explain: "按钮颜色，可直接传颜色值，如：#ccc",
            type: "string",
            optionalValue: "primary/red/blue/orange/green/yellow/gray/black",
            defaultValue: "primary"
          },
          {
            param: "loading",
            explain: "按钮加载",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "disabled",
            explain: "按钮禁用状态",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "round",
            explain: "按钮圆角",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
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
