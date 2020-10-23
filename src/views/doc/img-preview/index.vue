<template>
  <section>
    <p class="title">代码演示</p>
    <div class="box">
      <div class="box-title">基础用法</div>
      <f-code lang="javascript">{{base}}</f-code>
    </div>
    <!--<p class="title">API</p>-->
    <!--<div class="box">-->
    <!--<div class="box-title">Props</div>-->
    <!--<f-table :data="propList" type="prop"></f-table>-->
    <!--</div>-->
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
