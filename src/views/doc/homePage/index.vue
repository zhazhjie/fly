<template>
  <section class="home-page">
    <p class="title">安装</p>
    <p>在项目中执行以下命令：</p>
    <f-code lang="config">{{install}}</f-code>
    <p class="title">引入</p>
    <p>在 main.js 中写入以下内容：</p>
    <f-code>{{code}}</f-code>
    <p class="title">配置</p>
    <f-code>{{config}}</f-code>
    <p>然后就没有了。</p>
  </section>
</template>

<script>
  import {code, config, install} from "./code";
  import FCode from "../code";

  export default {
    name: "homePage",
    components: {FCode},
    data() {
      return {
        install: install,
        code: code,
        config: config,
      }
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>
  .home-page {
    background: #fff;
    padding: 20px;
  }
</style>
