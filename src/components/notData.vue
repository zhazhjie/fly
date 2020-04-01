/**
* @author: zhazhjie
* @email: zhazhjie@vip.qq.com
* @date: 2018-09-21 16:33:02
* @version: 1.0
*/

<template>
  <div class="not-data">
    <i>&#xe602;</i>
    <div>
      <slot>暂无数据</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'f-not-data',
    data() {
      return {}
    },
    components: {},
    methods: {},
    computed: {},
    mounted() {

    }
  }
</script>

<style scoped>
  .not-data {
    padding: 15px;
    text-align: center;
    color: #ccc;
  }

  .not-data i {
    font-family: "iconfont-common";
    display: block;
    font-size: 0.65rem;
    margin-bottom: 0.05rem;
  }
</style>
