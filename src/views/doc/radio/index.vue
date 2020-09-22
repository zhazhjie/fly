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
      <div class="box-title">Events</div>
      <f-table :data="eventList" type="event"></f-table>
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
            param: "label",
            explain: "Radio的值",
            type: "string/number",
            optionalValue: "-",
            defaultValue: "-"
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
          {
            param: "group",
            explain: "分组，当值和其他组Radio有重叠时必传",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
        ],
        eventList: [
          {
            event: "change",
            explain: "值改变事件",
            cb: "Function(val)，参数说明：[当前值]"
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
