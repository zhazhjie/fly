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
            type: "string/number",
            optionalValue: "",
            defaultValue: ""
          },
          {
            param: "readonly",
            explain: "是否只读",
            type: "Boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
          {
            param: "showText",
            explain: "是否显示文字",
            type: "Boolean",
            optionalValue: "true/false",
            defaultValue: "true"
          },
          {
            param: "scores",
            explain: "分数数组",
            type: "Array",
            optionalValue: "-",
            defaultValue: "[\n" +
								"          {\n" +
								"            text: \"差\",\n" +
								"            value: 1\n" +
								"          },\n" +
								"          {\n" +
								"            text: \"一般\",\n" +
								"            value: 2\n" +
								"          },\n" +
								"          {\n" +
								"            text: \"满意\",\n" +
								"            value: 3\n" +
								"          },\n" +
								"          {\n" +
								"            text: \"很满意\",\n" +
								"            value: 4\n" +
								"          },\n" +
								"          {\n" +
								"            text: \"非常满意\",\n" +
								"            value: 5\n" +
								"          },\n" +
								"        ]"
          },
        ],
      }
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>

</style>
