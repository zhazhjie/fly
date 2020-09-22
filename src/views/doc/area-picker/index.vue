<template>
  <section>
    <p class="title">代码演示</p>
    <div class="box">
      <div class="box-title">基础用法</div>
      <p class="tips">需要配置省市区列表，详见<span class="primary pointer" @click="routeTo('/')">快速上手</span></p>
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
            param: "showFlag",
            explain: "是否显示，支持 .sync 修饰符",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "defaultProps",
            explain: "选项的默认字段",
            type: "object",
            optionalValue: "-",
            defaultValue: "{value: 'value', text: 'text'}"
          },
          {
            param: "requireArea",
            explain: "是否显示区域",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
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
