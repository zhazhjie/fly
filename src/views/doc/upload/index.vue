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
            param: "imgUrl",
            explain: "图片地址",
            type: "string",
            optionalValue: "-",
            defaultValue: "-"
          },
          {
            param: "disabled",
            explain: "是否禁用",
            type: "Boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "maxHeight",
            explain: "裁剪最大高度，默认不限制",
            type: "number",
            optionalValue: "-",
            defaultValue: "-"
          },
					{
						param: "maxWidth",
						explain: "裁剪最大长度，默认不限制",
						type: "number",
						optionalValue: "-",
						defaultValue: "-"
					},
          {
            param: "clip",
            explain: "Boolean",
            type: "Boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "size",
            explain: "上传文件大小限制",
            type: "Number",
            optionalValue: "-",
            defaultValue: "5"
          },
          {
            param: "capture",
            explain: "限制只能拍照上传",
            type: "String",
            optionalValue: "camera",
            defaultValue: "-"
          },
        ],
        eventList:[
					{
						event: "success",
						explain: "上传成功事件",
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
