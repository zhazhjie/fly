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
            type: "array",
            optionalValue: "",
            defaultValue: ""
          },
          {
            param: "dataList",
            explain: "数据列表，二维数组",
            type: "array",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "showFlag",
            explain: "是否显示 picker，支持 .sync 修饰符",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "defaultProps",
            explain: "选项的默认字段",
            type: "object",
            optionalValue: "-",
            defaultValue: '{value: "value", text: "text"}'
          },
          {
            param: "format",
            explain: "格式化数值，如：1=>'01'",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
        ],
        eventList: [
          {
            event: "change",
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
