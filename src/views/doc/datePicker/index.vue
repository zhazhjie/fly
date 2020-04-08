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
            explain: "绑定值，",
            type: "string/date/array",
            optionalValue: "",
            defaultValue: ""
          },
          {
            param: "type",
            explain: "类型",
            type: "string",
            optionalValue: "date/year/month/datetime/time/minute/hour",
            defaultValue: "date"
          },
          {
            param: "showFlag",
            explain: "是否显示，支持 .sync 修饰符",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "format",
            explain: "格式日期，如：yyyy-MM-dd",
            type: "string",
            optionalValue: "-",
            defaultValue: '-'
          },
          {
            param: "maxTime",
            explain: "最大日期",
            type: "date/string",
            optionalValue: "-",
            defaultValue: "+10年"
          },
          {
            param: "minTime",
            explain: "最小日期",
            type: "date/string",
            optionalValue: "-",
            defaultValue: "-10年"
          },
          {
            param: "range",
            explain: "范围选择",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "yearStep",
            explain: "年份间隔",
            type: "number",
            optionalValue: "-",
            defaultValue: "1"
          },
          {
            param: "monthStep",
            explain: "月份间隔",
            type: "number",
            optionalValue: "-",
            defaultValue: "1"
          },
          {
            param: "dateStep",
            explain: "天数间隔",
            type: "number",
            optionalValue: "-",
            defaultValue: "1"
          },
          {
            param: "hourStep",
            explain: "小时间隔",
            type: "number",
            optionalValue: "-",
            defaultValue: "1"
          },
          {
            param: "minuteStep",
            explain: "分钟间隔",
            type: "number",
            optionalValue: "-",
            defaultValue: "1"
          },
          {
            param: "secondStep",
            explain: "秒间隔",
            type: "number",
            optionalValue: "-",
            defaultValue: "1"
          },
          {
            param: "quickSelect",
            explain: "按月选择和按日选择切换",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "limitCurMonth",
            explain: "限制可选范围为当前月",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
        ],
        eventList: [
          {
            event: "submit",
            explain: "点击确定事件",
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
