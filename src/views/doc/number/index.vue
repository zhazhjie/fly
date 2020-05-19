<template>
  <section>
    <p class="title">代码演示</p>
    <div class="box">
      <div class="box-title">基础用法</div>
        <f-code lang="html">{{base}}</f-code>
    </div>
    <!--<div class="box">-->
      <!--<div class="box-title">扩展用法</div>-->
      <!--<f-code lang="javascript">{{ext}}</f-code>-->
    <!--</div>-->
    <p class="title">API</p>
    <div class="box">
      <div class="box-title">Props</div>
      <f-table :data="propList" type="prop"></f-table>
    </div>
    <div class="box">
      <div class="box-title">Events</div>
      <f-table :data="eventList" type="event"></f-table>
    </div>
  </section>
</template>

<script>
  import {base,ext} from "./code";
  import FTable from "../table";
  import FCode from "../code";

  export default {
    name: "button-doc",
    components: {FCode, FTable},
    data() {
      return {
        base: base,
        ext: ext,
        propList: [
          {
            param: "value/v-model",
            explain: "绑定值",
            type: "string/number",
            optionalValue: "",
            defaultValue: ""
          },
          {
            param: "maxValue",
            explain: "最大值",
            type: "number",
            optionalValue: "-",
            defaultValue: "Number.MAX_SAFE_INTEGER"
          },
          {
            param: "minValue",
            explain: "最小值",
            type: "number",
            optionalValue: "-",
            defaultValue: "0"
          },
          {
            param: "step",
            explain: "步伐值",
            type: "number",
            optionalValue: "-",
            defaultValue: "1"
          },
          {
            param: "size",
            explain: "尺寸",
            type: "string",
            optionalValue: "small/mini",
            defaultValue: "small"
          },
          {
            param: "disabled",
            explain: "禁用标识",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "editable",
            explain: "值可手动输入，仅对f-input-number有效",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "display",
            explain: "加减按钮始终显示，仅对f-input-number有效",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          }
        ],
        eventList: [
          {
            event: "add",
            explain: "绑定值增加时触发，先于input事件",
            cb: "Function({value, e})，参数说明：{绑定值，事件对象}"
          },
          {
            event: "subtract",
            explain: "绑定值减小时触发，先于input事件",
            cb: "Function({value, e})，参数说明：{绑定值，事件对象}"
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
