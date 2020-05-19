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
            param: "showFlag",
            explain: "是否显示，支持 .sync 修饰符",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "loading",
            explain: "确认按钮加载",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "width",
            explain: "对话框宽度",
            type: "number",
            optionalValue: "-",
            defaultValue: "300"
          },
          {
            param: "height",
            explain: "对话框高度",
            type: "number",
            optionalValue: "-",
            defaultValue: "300"
          },
          {
            param: "top",
            explain: "对话框至浏览器窗口顶部距离",
            type: "number",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "left",
            explain: "对话框至浏览器窗口左侧距离",
            type: "number",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "title",
            explain: "标题",
            type: "string",
            optionalValue: "-",
            defaultValue: "提示"
          },
          {
            param: "reset",
            explain: "重置弹出位置",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
        ],
        eventList: [
          {
            event: "submit",
            explain: "点击确定事件",
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
