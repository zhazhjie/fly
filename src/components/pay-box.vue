<template>
  <div>
    <f-popup position="bottom" :show-flag="showFlag" @update:showFlag="closePay">
      <template slot="title">支付方式</template>
      <slot></slot>
      <div class="pay-type">
        <label class="pay-item">
          <div class="info">
            <i class="pay-icon green">&#xe614;</i>
            <div>
              <p>微信支付</p>
              <p class="gray font12"><i class="icon-common">&#xe60d;</i> 微信安全支付</p>
            </div>
          </div>
          <f-radio v-model="payType" :label="wxCode"></f-radio>
        </label>
        <label class="pay-item" v-if="!isWeiXin">
          <div class="info">
            <i class="pay-icon blue">&#xe725;</i>
            <div>
              <p>支付宝</p>
              <p class="gray font12"><i class="icon-common">&#xe60d;</i> 支付宝安全支付</p>
            </div>
          </div>
          <f-radio v-model="payType" :label="alipayCode"></f-radio>
        </label>
        <slot name="other" :payType="payType"></slot>
      </div>
      <f-button size="big" :loading="loading" @click="submitPay">确认</f-button>
    </f-popup>
    <f-popup :popFlag.sync="passwordFlag" @submit="submitPassword">
      <template slot="title">支付密码</template>
      <div>
        <f-input-2 type="password" placeholder="请输入支付密码" v-model="payPassword"></f-input-2>
      </div>
    </f-popup>
  </div>
</template>

<script>
  import {isWeiXin} from "js-utils";

  export default {
    name: "f-pay-box",
    props: {
      showFlag: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      wxCode: {
        type: String,
        default: "WX"
      },
      alipayCode: {
        type: String,
        default: "ALIPAY"
      },
      defaultPayType: {
        type: String,
        default: "WX"
      }
    },
    data() {
      return {
        isWeiXin: isWeiXin(),
        passwordFlag: false,
        payPassword: "",
        payType: this.defaultPayType,
      }
    },
    computed: {},
    methods: {
      submitPassword() {
        if (!this.payPassword) {
          return this.showMsg({text: "支付密码不能为空！", type: 2});
        }
        this.passwordFlag = false;
        this.$emit("submitPay", {payType: this.payType, payPassword: this.payPassword});
      },
      closePay() {
        this.$emit('update:showFlag', false);
      },
      submitPay() {
        this.$emit("submitPay", {payType: this.payType, payPassword: this.payPassword});
      },
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/pay-box";
</style>
