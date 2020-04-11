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
            param: "imgData",
            explain: "base64图片",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "showFlag",
            explain: "是否显示，支持 .sync 修饰符",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "size",
            explain: "裁切后的尺寸，单位px",
            type: "number",
            optionalValue: "-",
            defaultValue: '300'
          },
        ],
        eventList: [
          {
            event: "submitClip",
            explain: "确定裁切事件",
            cb: "Function(imgData)，参数说明：[裁切后的base64图片]"
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
