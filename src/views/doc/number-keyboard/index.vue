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
            param: "showFlag",
            explain: "是否显示，支持 .sync 修饰符",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "maxLength",
            explain: "最大长度，默认不限制",
            type: "number",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "submitText",
            explain: "确认按钮显示文字",
            type: "string",
            optionalValue: "-",
            defaultValue: "完成"
          },
          {
            param: "beforeClose",
            explain: "数字键盘收起时触发，接收一个参数：Function(done)，操作完成后调用done收起键盘",
            type: "function",
            optionalValue: "-",
            defaultValue: "-"
          },
        ],
        eventList: [
          {
            event: "submit",
            explain: "点击确定时触发",
            cb: "Function()"
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
