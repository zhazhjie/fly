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
            param: "showFlag",
            explain: "是否显示，支持 .sync 修饰符",
            type: "Boolean",
            optionalValue: "true/false",
            defaultValue: "false"
          },
					{
						param: "loading",
						explain: "加载中标识",
						type: "Boolean",
						optionalValue: "true/false",
						defaultValue: "true"
					},
          {
            param: "wxCode",
            explain: "微信支付编码",
            type: "string",
            optionalValue: "-",
            defaultValue: "WX"
          },
          {
            param: "alipayCode",
            explain: "支付宝支付编码",
            type: "string",
            optionalValue: "-",
            defaultValue: "ALIPAY"
          },
          {
            param: "defaultPayType",
            explain: "默认支付类型",
            type: "string",
            optionalValue: "-",
            defaultValue: "WX"
          },
        ],
        eventList:[
					{
						event: "submitPay",
						explain: "点击确定，提交支付事件",
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
