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
            param: "loading",
            explain: "加载中标识",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "eof",
            explain: "到底标识，没有更多数据了",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "dataLength",
            explain: "数据长度",
            type: "number",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "emptyText",
            explain: "无数据时显示的文字",
            type: "string",
            optionalValue: "-",
            defaultValue: "-暂无数据-"
          },
          {
            param: "bodyScroll",
            explain: "body内滚动，否则元素内滚动",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          }
        ],
        eventList: [
          {
            event: "loadMore",
            explain: "到底加载更多事件",
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
