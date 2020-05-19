<template>
  <section>
    <p class="title">代码演示</p>
    <div class="box">
      <div class="box-title">基础用法</div>
        <p class="tips">需要配置上传地址或token，详见<span class="primary pointer" @click="routeTo('/')">快速上手</span></p>
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
          // {
          //   param: "imgUrl",
          //   explain: "图片地址",
          //   type: "string",
          //   optionalValue: "-",
          //   defaultValue: "-"
          // },
          {
            param: "disabled",
            explain: "是否禁用",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "maxHeight",
            explain: "图片最大高度，默认不限制",
            type: "number",
            optionalValue: "-",
            defaultValue: "-"
          },
					{
						param: "maxWidth",
						explain: "图片最大宽度，默认不限制",
						type: "number",
						optionalValue: "-",
						defaultValue: "-"
					},
          {
            param: "clip",
            explain: "是否需要裁剪",
            type: "boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "size",
            explain: "上传文件大小限制，单位MB",
            type: "number",
            optionalValue: "-",
            defaultValue: "5"
          },
          {
            param: "capture",
            explain: "值为camera时限制只能拍照上传",
            type: "string",
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
