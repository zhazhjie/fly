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
            param: "autoPlay",
            explain: "自动播放",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "duration",
            explain: "动画时长，单位毫秒",
            type: "number",
            optionalValue: "-",
            defaultValue: "300"
          },
          {
            param: "delay",
            explain: "播放间隔时长，单位毫秒",
            type: "number",
            optionalValue: "-",
            defaultValue: "3000"
          },
          {
            param: "loop",
            explain: "循环播放",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "showIndicators",
            explain: "显示指示器",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "indicatorType",
            explain: "指示器类型",
            type: "string",
            optionalValue: "point/number",
            defaultValue: "point"
          },
          {
            param: "initIndex",
            explain: "轮播图初始位置，即将支持",
            type: "number",
            optionalValue: "-",
            defaultValue: "0"
          },
        ],
        eventList: [
          {
            event: "change",
            explain: "轮播图切换事件",
            cb: "Function(index)，参数说明：[当前索引]"
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
